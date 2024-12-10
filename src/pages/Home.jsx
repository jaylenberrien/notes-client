import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import ListItem from "../components/ListItem";
// import Note from "../../../backend/Models/Notes";
// import { response } from "express";

export default function Home () {


    const [entry, setEntry] = useState("");

    const handlechange = (value) =>{
        setEntry(value)
    }


    const [notes, setNotes] = useState([])

    const fetchNotes = async () =>{
        const response = await axios.get('http://localhost:3000/notes/notes')
        setNotes(response.data)
     }
   
    useEffect(() =>{

        fetchNotes()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/notes/create', 
                { entry: entry }, 
                { headers: { 'Content-Type': 'application/json' }}
            );

            setEntry('');
        
            const response = await axios.get('http://localhost:3000/notes/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const deleteNote = async (idStore) =>{
        const id = {
            entryId: idStore
        };
        const deleteReq = await axios.delete(`http://localhost:3000/notes/delete`, 
            
            {
                 data:  {entryId: idStore} 
            });

        console.log(deleteReq.data); 
        console.log(id);
        // window.location.reload();
        fetchNotes();
    }

    return(
        <>
            <div className="main-container">
                <h2>Notes for later</h2>
                <div>
                    <ul class="entries">
                        {notes && notes.map((note) => (
                            <>
                                <div class="entry">
                                    <li key={note._id}>{note.entry}</li>
                                    <button class="entry" id="entry-button" onClick={() => {const idStore = note._id; deleteNote(idStore)}}>delete</button>
                                </div>
                                
                             </>

                        ))}
                        
                    </ul>

                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input className="input" type="text" value={entry} onChange={(e) => handlechange(e.target.value)} />
                        <button>Add</button>
                    </form>

                </div>
            
            </div>

        </>

    )
}