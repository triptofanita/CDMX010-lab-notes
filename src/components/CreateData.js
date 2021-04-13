import React, { useState, useEffect } from 'react';
import { store } from './firebaseconfig';

export default function CreateData () {

  const [updateMode, setUpdateMode] = useState(false);
  const [idNote, setIdNote] = useState('');
  const [note, setNote] = useState('');
  const [getNote, setGetNote] = useState([]);
  const [error, setError] = useState('');
  const textAreaContainer = document.getElementById("inputSetNote");

    //Se comunica con firebase para obtener la data
    useEffect (() => {
      const getNote = async () => {
        const {docs} = await store.collection('postIt').get();
        const arrNote = docs.map(item => ({id:item.id, ...item.data()}));
            //llamar al nuevo array que contiene la data
        setGetNote(arrNote);
      }
      getNote()
      }, [])

    const createNotes = async (e) => {
      e.preventDefault(e);
      try{
        const secretNotes = {
          note:note
        };
        if (!note){
          alert("Don't forget keep your idea");
        }else{

        await store.collection('postIt').add(secretNotes);
        const {docs} = await store.collection('postIt').get();
        const arrNote = docs.map((item) => ({id:item.id, ...item.data()}));
        setGetNote(arrNote);
        textAreaContainer.value='';
        }
      }catch (error){
      console.log(error)}
    }


    const deleteNote = async (id) => {
      try{
        await store.collection('postIt').doc(id).delete();
        const {docs} = await store.collection('postIt').get();
        const arrNote = docs.map(item => ({id:item.id, ...item.data()}));
            //llamar otra vez al array que contiene la data
        setGetNote(arrNote);
      }catch(e){
        console.log(e)
      }
    }

    //detono updateMode
    const handleUpdate = (item) => {
      setUpdateMode(true);
      setNote(item.note);
      setIdNote(item.id);
    }

    const setUpdate = async (e) => {
      e.preventDefault(e);
      try{
      if (!note){
      //verificar setError
      setError("Olvidaste editar la nota")
      }else{
        const updatedCollection = await store.collection('postIt').doc(idNote).update({
          note:note
        })
        //await store.collection('postIt').doc(idNote).set(updatedCollection)
        const {docs} = await store.collection('postIt').get(updatedCollection);
        const newArrNote = docs.map(item => (item.id === idNote ? {id: item.id,...item.data} : item
        ))
          setGetNote(newArrNote);
          setUpdateMode(false);
          setIdNote('');
          setNote('');
        }
      }catch(e){
        console.log(e)}
    }

    return (
      <div className="mainContainer">
        <div className="notesContainer">
          <h2>Notes</h2>
            <div className="createNoteForm">
              <form onSubmit={updateMode ? setUpdate : createNotes} className="setNoteForm">
                <div className="textareaSetNote">
                  <textarea onChange={(e)=>{setNote(e.target.value)}}
                            className="inputNote"
                            id="inputSetNote"
                            placeholder="Keep an idea"
                            type="text"
                            />
                </div>
                  <div className="btnAddNote">
                    <input className="buttonAdd"
                           type="submit"
                           value={updateMode ? "Update" : "Add"}
                            />
                  </div>
              </form>
                {
                  error ?
                  (<div>
                  <p>Don't forget keep your idea</p>
                  </div>)
                  :
                  (<span></span>)
                }
              </div>
                <div className="unityNote">
                  <div className="getPostIt">
                    {getNote.map(item => (
                      <div className="textAreaNote">
                        <textarea className="printedNote"
                        id="editor"
                         key={item.id}>{item.note}
                        </textarea>
                          <div className="button">
                            <button onClick={(id) => {handleUpdate(item)}} className="btnUpdate" type="submit" value="Update">Update</button>
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
