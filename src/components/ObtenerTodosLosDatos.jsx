import React, { useEffect, useState } from 'react';
import { borrarDato, obtenerData, obtenerTodosLosDatos, revisitaActualizar } from '../firebase/firebase';


import { TbEditCircle } from "react-icons/tb";

const ObtenerTodosLosDatos = ({ data, setData, getInfo,loginStatus  }) => {

    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState(false);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newInterest, setNewInterest] = useState('');

    useEffect( ()=> {
        getInfo();
    },[]);
    

    const handleClick = (id) => {
        borrarDato(id);
    }

    const handleClickEdit = async (item) => {
        setEdit(true);
        setItem(item);

        setNewName(item.name);
        setNewNumber(item.number);
        setNewInterest(item.interest);

        console.log(item + ';;;;');
        getInfo();
    }

    
    const handleChangeName = (e) => {
        setNewName(e.target.value);
        
    }
    const handleChangeNumber = (e) => setNewNumber(e.target.value);
    const handleChangeInterest = (e) => setNewInterest(e.target.value);

    const handleClickSubmit = (e) => {
        e.preventDefault();
        console.log('lll');
        revisitaActualizar(loginStatus,item.id, newName, newNumber, newInterest);
        setEdit(false);
        getInfo();
    }


    if( edit ){
        return (
            <div className='border border-danger-subtle w-50 p-5 mx-auto mt-5'>
                <form onSubmit={handleClickSubmit}>
                    <input type="text" value={newName} onChange={handleChangeName} className='form-control my-2'/>
                    <input type="text" value={newNumber} onChange={handleChangeNumber} className='form-control my-2' />
                    <input type="text" value={newInterest} onChange={handleChangeInterest} className='form-control my-2' />
                    <input type="submit" value='Actualizar Datos' className='btn btn-success form-control  my-2' />
                </form>
            </div>
          )
    }else {
        return (
            <div className='border border-danger-subtle w-50 p-5 mx-auto mt-5'>
                {/* <input type="button" value='Consultar datos' onClick={handleClick}/> */}
                {
                    data ? data.map( item => (
                        <div key={ item.id } className='border-bottom my-3 d-flex justify-content-between'>
                            <div>
                                <p className='my-1'>{item.name}</p>
                                <p className='my-1'>{item.number}</p>
                                <p className='my-1'>{item.interest}</p>
                            </div>
                            <div>
                                <TbEditCircle className='mx-3 fs-3' onClick={()=>handleClickEdit(item)}/>
                                <input className='btn btn-outline-danger align-self-center' type="button" value="borrar" onClick={()=>{handleClick(item.id);getInfo();}} />
                            </div>
                        </div>
                    ))
                    : null 
                }
            </div>
          )
    }

  
}

export default ObtenerTodosLosDatos;
