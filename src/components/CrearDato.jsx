import React, { useState } from 'react';
import { enviar } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const CrearDato = ({getInfo, loginStatus}) => {

  

  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [interes, setInteres] = useState('');

  const handleNombre = (e) => {
    setNombre(e.target.value);
  }
  const handleNumero = (e) => {
    setNumero(e.target.value);
  }
  const handleInteres = (e) => {
    setInteres(e.target.value);
  }
  


  const enviarInfo = async () => {
    console.log('hola');
    console.log( await enviar(`revisitas-${loginStatus}`, uuidv4(), nombre, numero, interes) );
    await getInfo();
    // console.log(numero);
  }

  return (
    <form className='w-50 p-5 border border-danger-subtle m-auto mt-5' onSubmit={enviarInfo}>
        <h1 className='text-center mb-4'>Nueva Revisita</h1>

        <input type="text" placeholder='nombre' onChange={handleNombre} className='form-control my-2'/>
        <input type="number" placeholder='numero' onChange={handleNumero} className='form-control my-2'/>
        <input type="text" placeholder='interes' onChange={handleInteres} className='form-control my-2'/>
        <input type="button" value='enviar' onClick={enviarInfo} className='btn btn-primary w-100 my-2'/>
      </form>
  )
}

export default CrearDato;
