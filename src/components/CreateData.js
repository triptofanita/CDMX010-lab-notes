import React, { useState, useEffect } from 'react';
import { store } from '../service/firebaseconfig';
import LogOut from './LogOut';

export default function CreateData () {
  const [updateMode, setUpdateMode] = useState(false);
  const [idNote, setIdNote] = useState('');
  const [note, setNote] = useState('');
  const [getNote, setGetNote] = useState([]);

  /*const [locura, setlocura]= useState({
    nota:'',
    idnota:''
  })*/

  useEffect(() => {
    const getNote = async () => {
      const { docs } = await store.collection('postIt').get();
      const arrNote = docs.map((item) => ({ id: item.id, ...item.data() }));
      //llamar al nuevo array que contiene la data para renderizar
      setGetNote(arrNote);
    };
    getNote();
  }, []);

  const createNotes = async (e) => {
    e.preventDefault(e);
    try {
      const secretNotes = {
        note: note,
      };
      if (!note) {
        alert("Don't forget keep your idea");
      } else {
        await store.collection('postIt').add(secretNotes);
        const { docs } = await store.collection('postIt').get();
        const arrNote = docs.map((item) => ({ id: item.id, ...item.data() }));
        setGetNote(arrNote);
        setNote('');
        //textAreaContainer.value = '';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    if (window.confirm('Do you really want to delete this note?'))
    try {
      await store.collection('postIt').doc(id).delete();
      const { docs } = await store.collection('postIt').get();
      const arrNote = docs.map((item) => ({ id: item.id, ...item.data() }));
      //llamar otra vez al array que contiene la data
      setGetNote(arrNote);
    } catch (e) {
      console.log(e);
    }
  };

  //detono updateMode
  const handleUpdate = (item) => {
    setUpdateMode(true);
    setNote(item.note)
    setIdNote(item.id);
  };

  const setUpdate = async () => {
    try {
      if (!note) {
        alert ('Update idea');
      } else {
        const updatedCollection = await store.collection('postIt').doc(idNote).update({
            note: note,
          });
          console.log("actualizando nota")
        const { docs } = await store.collection('postIt').get(updatedCollection);
        console.log('obteniendo notas...')
        const currentArr = docs.map((item) =>
          (item.id === idNote ? { idNote: item.id, ...item.note } : item
        ));
        setGetNote(currentArr);
        setIdNote('');
        setNote('');
        setUpdateMode(false);

      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <div className='notesContainer'>
        <LogOut />
        <div className='createNoteForm'>
          <form
            onSubmit={updateMode ? setUpdate : createNotes}
            className='setNoteForm'
          >
            <div className='textareaSetNote'>
              <textarea
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                className='inputNote'
                id='inputSetNote'
                placeholder='Keep an idea'
                type='text'
                value={note}
              />
            </div>
            <div className='btnAddNote'>
              <input
                className='buttonAdd'
                type='submit'
                value={updateMode ? 'Update' : 'Add'}>
              </input>
            </div>
          </form>
        </div>
        <div className='unityNote'>
          <div className='getPostIt'>
            {getNote.map((item) => (
              <div className='textAreaNote' key={item.id}>
                <textarea className='printedNote' id='editor' value={item.note}>
                </textarea>
                <div className='button'>
                  <img
                    onClick={(id) => {
                      handleUpdate(item);
                    }}
                    src={process.env.PUBLIC_URL + '/assets/img/pen.svg'} alt=""
                    className='btnUpdate'
                    type='submit'
                    value='Update'
                  ></img>
                  <img
                    onClick={(id) => {
                      deleteNote(item.id);
                    }}
                    src={process.env.PUBLIC_URL + '/assets/img/trash.svg'} alt=""
                    className='btnDelete'
                    type='submit'
                    value='Delete'
                  ></img>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
