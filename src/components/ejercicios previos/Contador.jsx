import React, {Fragment, useState} from 'react';

const Contador = () => {
    const [numero, setNumero] = useState(0)
    const aumentar = () => {
         setNumero(numero+1) 
    }
    const reducir = () => {
        setNumero(numero-1)
    }
        return (
            <Fragment>
                <h2>Cantidad del contador:{numero}</h2>
                <button className="btn btn-succes btn-block"  onClick={aumentar}>Aumentar</button>
                <button className="btn btn-succes btn-block" onClick={reducir}>Reducir</button>
            </Fragment>
        )
}

export default Contador