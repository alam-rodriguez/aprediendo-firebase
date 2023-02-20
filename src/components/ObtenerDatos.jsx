import React, { useState } from 'react';
import { obtenerData } from '../firebase/firebase'

const ObtenerDato = () => {

    const [datos, setDatos] = useState();

    const handleClick = async () => {
        let datos = await obtenerData();
        setDatos( datos )
    }

  return (
    <div className='w-50 p-5 mt-5 mx-auto border border-danger-subtle'>
       <input type="button" value="Consultar dato" onClick={handleClick} className='btn btn-dark' />
        { datos ? 
            <div>
                <p className='fs-3 d-flex justify-content-between'>Nombre: <span className='fw-bold'>{datos.name}</span></p>
                <p className='fs-3 d-flex justify-content-between'>Numero: <span className='fw-bold'>{datos.number}</span></p>
                <p className='fs-3 d-flex justify-content-between'>Interes: <span className='fw-bold'>{datos.interest}</span></p>
            </div>
        : null 
        }
    </div>
  )
}

export default ObtenerDato;


// No esta en uso;