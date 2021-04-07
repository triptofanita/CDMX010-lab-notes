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
            //llamar al nuevo array que contiene la data
             setGetNote(arrNote)
        }
        getNote()
        }, [])

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
        //eslint marca error si quito las llaves l40
    const deleteNote = async (id) => {
        try{
            await store.collection('postIt').doc(id).delete();
            const {docs} = await store.collection('postIt').get();
            const arrNote = docs.map(item => ({id:item.id, ...item.data()}));
            //llamar otra vez al array que contiene la data
             setGetNote(arrNote)
        }catch(e)
    {}}
        //pasar const al form para crear note en fb
        //No puedo cerrar etiqueta en textarea
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
                    </form>
                    {
                        error ?
                        (<div>
                            <p>error</p>
                        </div>)
                        :
                        (<span></span>)
                    }
                </div>
                <div className="row">
                    <h2>Todas mis notas</h2>
                        <div className="row">
                            <div className="unityNote">
                                    <div className="getPostIt">
                                        {getNote.map(item => (
                                            <div className="textareaNote">
                                                <textarea key={item.id}>{item.note}</textarea>
                                                <div className="button">
                                                    <button className="btnUpdate" type="submit" value="Update">Update</button>
                                                    <button onClick={(id) => {deleteNote(item.id)}} className="btnDelete" type="submit" value="Delete">Delete</button>
                                                </div>
                                            </div>
                                        ))
                                        }
                                    </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}


