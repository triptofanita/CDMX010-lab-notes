import React, { useState, useEffect } from 'react';
import { store } from '../firebaseconfig';

export default function CreateData() {
    const [note, setNote] = useState('');
    //las notas se alojaran en este array
    const [getNote, setGetNote] = useState([]);
    const [error, setError] = useState('');

    //comunica con fb para obtener la data 
    useEffect (() => {
        const getNote = async () => {
            const {docs} = await store.collection('postIt').get();
            const arrNote = docs.map(item => ({id:item.id, ...item.data()}));
            //llamar al nuevo array que contiend la data
                setGetNote(arrNote)
        }
        getNote();
        })

    const createNotes = async (e) => {
        e.preventDefault();
        if (!note.trim()){
            //verificar setError
            setError("Olvidaste escribir la nota")
        }
        const secretNotes = {
            note:note
        }
        try{
            //Renderear la data
            //probar solo con getNote(), refactorizar. 
            const {docs} = await store.collection('postIt').get();
            const arrNote = docs.map(item => ({id:item.id, ...item.data()}));
                setGetNote(arrNote)
          
            const createData = await store.collection('postIt').add(secretNotes)
        }catch(e)
    {}}
        //eslint marca error si quito las llaves l33
        //pasar al form const para crear note en fb
    return (
        <div className="container">
            <div className="row">
                <h2>My Secret Notes</h2>
                <div>
                    <form onSubmit={createNotes} className="form-group"> 
                        <input onChange={(e)=>{setNote(e.target.value)}}
                        className="form-control mt-4"
                        placeholder="Escribe una nota"
                        type="text"
                        />
                        <input className="btn btn-info btn-sm mt-3"
                        type="submit"
                        value="Add"
                        />
                        <input className="btn btn-dark btn-sm mt-3"
                        type="submit"
                        value="Delete"
                        />
                    </form>
                    {
                        error ?
                        (<div>
                            <p>error</p>
                        </div>)
                        :
                        (<span></span>)
                    };
                </div>
                <div className="row">
                    <h2>Todas mis notas</h2>
                    {getNote.map(item => (
                        <div className="getPostIt">
                            <textarea key={item.id}>{item.note}</textarea>
                        </div>
                    ))
                    };
                </div>
            </div>
        </div>
    )
}


