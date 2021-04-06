import React, { useState, useEffect } from 'react';
import { store } from '../firebaseconfig';

export default function ReadData() {
    const [getNote, setGetNote] = useState([])
    
    useEffect (() => { 
        const readNotes = async () => {
            const {docs} = await store.collection('postIt').get()
            const newSecretNotes = (e) => {
                e.epreventDefault();
            docs.map(item => ({id:item.id, ...item.data()}))
            }
            // eslint-disable-next-line no-unused-expressions
            setGetNote[newSecretNotes]
        }
})

    return (
        <div className="container">
            <div className="col">
                <h2>Todas mis notas</h2>
                <form onSubmit={(e) => setGetNote(e.target.value)} className="form-group">
                </form>
            </div>
        </div>
    )
}

