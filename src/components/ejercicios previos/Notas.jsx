import React, { useState } from 'react';

const Notas = () => {
  const [nota, setNota] = useState('');
    const [notaAgregada, setNotaAgregada] = useState([]);
        const addNewNote = (e) => {
            e.preventDefault();
            setNotaAgregada([...notaAgregada,nota])
        }
    //dentro del retun todo lo que se va a renderizar
        return (
            <div>
                <h4>My Secret Notes</h4>
                    <div className="row">
                        <div clasName="col">
                            <form onSubmit={(e)=> addNewNote(e)} className="form-group">
                                <input onChange={(e)=>{setNota(e.target.value)}} type="text" placeholder="Escribe tu nota"/>
                                <button type="submit" value="Agregar esta nota"/>
                            </form>    
                        </div>
                    </div>
            </div>
        )
}

export default Notas
