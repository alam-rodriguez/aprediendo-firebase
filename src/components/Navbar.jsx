import React, { useState } from 'react'
import { crearUsuario, consultarUsuario, signOutUser } from '../firebase/firebase';


const Navbar = ({loginStatus, setLoginStatus, alertSignOut, alertSignin}) => {

  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleCorreo = (e) => setCorreo(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleClickSignin = () => {
    setSignin(true);
    setSignup(false);
  }
  const handleClickSignup = () => {
    setSignup(true);
    setSignin(false);
  }
	// const handleClickSignout = () => {
	// 	setLoginStatus(false);
	// }

  const handleSubmitSignin = async (e) => {
    e.preventDefault();
    try {
      const correoActual = await consultarUsuario(correo, password); 
			setLoginStatus( correoActual );
			// setLoginStatus(correoActual);
      console.log(loginStatus + '-------------')
      alertSignin();
		} catch (error) {
			alert('Algo salio mal');
		}
  }

	const handleSubmitSignup = async (e) => {
		e.preventDefault();
		try {
			let correoActual = await crearUsuario(correo, password);
			setLoginStatus(correoActual);
      alertSignin(loginStatus);
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <>
      <header className='w-100 bg-warning p-4'>
          <nav className='d-flex justify-content-end'>
            <p className='fs-4 m-0 mx-5' onClick={handleClickSignin}>Sign in</p>
            {
							(!loginStatus) ?
								<p className='fs-4 m-0 mx-5' onClick={handleClickSignup}>Sign up</p>
							: 
								<p className='fs-4 m-0 mx-5' onClick={()=> {
                  signOutUser();
                  setLoginStatus(false);
                  alertSignOut();
                }}>Sign out</p>
						}
          </nav>
          
      </header>
      {
        signin ? 
          <form className='w-50 p-5 mx-auto mt-5 border border-danger' onSubmit={handleSubmitSignin}>
            <h2 className='text-center mb-3'>Sign in</h2>
            <input type="text" onChange={handleCorreo} className='form-control my-2' placeholder='Correo' />
            <input type="password" onChange={handlePassword} className='form-control my-2' placeholder='Contraseña' />
            <input type="submit" className='btn btn-outline-danger form-control my-2'/>
          </form>
        : null
        }
        {
          signup ? 
            <form className='w-50 p-5 mx-auto mt-5 border border-danger' onSubmit={handleSubmitSignup}>
              <h2 className='text-center mb-3'>Sign up</h2>
            	<input type="text" onChange={handleCorreo} className='form-control my-2' placeholder='Correo' />
              <input type="password" onChange={handlePassword} className='form-control my-2' placeholder='Contraseña' />
              <input type="submit" className='btn btn-outline-danger form-control my-2'/>
            </form>
          : null
        }
    </>
  )
}

export default Navbar;
