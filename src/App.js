import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import 'bootstrap/dist/css/bootstrap.css';

import CrearDato from './components/CrearDato';
import ObtenerDato from './components/ObtenerDatos'
import ObtenerTodosLosDatos from './components/ObtenerTodosLosDatos';

import { obtenerTodosLosDatos, signinAuto } from './firebase/firebase';
import Navbar from './components/Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [data, setData] = useState([]);

  const [loginStatus, setLoginStatus] = useState(false);


  useEffect(()=> {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLoginStatus(user.email);
        // console.log(loginStatus)
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

    const getInfo = async () => {
        let datos = await obtenerTodosLosDatos(loginStatus);
        setData( datos );
        // console.log(data);
    }  

    const alertSignin = (email) => {
      toast.success('Haz iniciado secion con '+ loginStatus, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    const alertSignOut = () => {
      toast.success('Haz salido de ' + loginStatus, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

    // console.log(loginStatus + '-------------')


  return (
    <div className="App">
      <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} alertSignOut={alertSignOut} alertSignin={alertSignin} />
      { loginStatus ? 
          <>
            <CrearDato loginStatus={loginStatus} getInfo={getInfo} />
            {/* <ObtenerDato /> */}
            <ObtenerTodosLosDatos data={data} setData={setData} getInfo={getInfo} loginStatus={loginStatus}/>
          </>
        : 
          null  
    }
      <ToastContainer />
    </div>
  );
}

export default App;
