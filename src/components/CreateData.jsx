import React, { useState, useEffect } from 'react';
import { store } from './firebaseconfig';

export default function CreateData () {
    const [updateMode, setUpdateMode] = useState(null);
    const [idNote, setIdNote] = useState('');
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
          
            // eslint-disable-next-line no-unused-vars
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

    const updateNote = async (id) => {
        try{
        // eslint-disable-next-line no-unused-vars
        // eslint-disable-next-line no-use-before-define
        const data = await store.collection('postIt').doc(id).get();
        // eslint-disable-next-line no-undef
        const { id, note } = data.data()
        setNote(note)
        setIdNote(id)
        setUpdateMode(true)
        }catch(e)
    {}}

    const setUpdate = async (e) => {
        e.preventDefault(e);
        if (!note.trim()){
            //verificar setError
            setError("Olvidaste escribir la nota")
        }
        const noteUpdate = {
        note:note,
        }
        try { 
            // eslint-disable-next-line no-undef
            await store.collection('postIt').doc(idNote).set(noteUpdate);
            const {docs} = await store.collection('postIt').get();
            const arrNote = docs.map(item => ({id:item.id, ...item.data()}));
            setGetNote(arrNote)
        }catch (e){
            console.log(e)
        }
        setNote('')
        setIdNote('')
        setUpdateMode(false)
    }
        //pasar const al form para crear note en fb
        //No puedo cerrar etiqueta en textarea
    return (
        <div className="mainContainer">
            <div className="notesContainer">
                <h2>My Secret Notes</h2>
                <div className="createNoteForm">
                    <form onSubmit={updateMode ? setUpdate : createNotes} className="setNoteForm"> 
                        <div className="textareaSetNote">
                            <textarea onChange={(e)=>{setNote(e.target.value)}}
                            className="inputNote"
                            placeholder="Escribe una nota"
                            type="text"
                            />
                        </div>
                        <div className="btnAddNote">
                            <input className="buttonAdd"
                            type="submit"
                            value="Add"
                            />
                        </div>
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
                        <div className="unityNote">
                            <div className="getPostIt">
                                {getNote.map(item => (
                                    <div className="textAreaNote">
                                        <textarea className="printedNote" key={item.id}>{item.note}</textarea>
                                            <div className="button">
                                                <button onClick={(id) => {updateNote(item.id)}} className="btnUpdate" type="submit" value="Update">Update</button>
                                                <button onClick={(id) => {deleteNote(item.id)}} className="btnDelete" type="submit" value="Delete">Delete</button>
                                            </div>
                                    </div>
                                        ))
                                        }
                            </div>
                        </div>
            </div>
        </div>
    )
}