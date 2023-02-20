// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gOjDlYXYxoMhXXHYvKJckOP62LHDz8Q",
  authDomain: "para-practicar-27253.firebaseapp.com",
  projectId: "para-practicar-27253",
  storageBucket: "para-practicar-27253.appspot.com",
  messagingSenderId: "205252703958",
  appId: "1:205252703958:web:7dd076100056ed37353b77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const crearUsuario = async (email, password) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // const user = userCredential.user;
    return userCredential.user.email;
  } catch (error) {
    console.log(error);
  }
}

export const consultarUsuario = async (email, password) => {
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    // const user = userCredential.user;
    // console.log(first)
    return userCredential.user.email;
  } catch (error) {
    console.log(error);
  }
}

// export const signinAuto = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user){
//       console.log(user.email + '+')
//       return user.email;
//     }else {
//       console.log('no existe user');
//       return 'no existe user';
//     }
//   });
// }

export const signOutUser = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const enviar = async (revisitas, id, nombre, numero, interes) => {
  await setDoc(doc(db, revisitas, id), {
    id:id,
    name: nombre,
    number: numero,
    interest: interes,
  });
};

export const obtenerData = async () => {
  const docRef = doc(db,'revisitas', 'pedro martinez');
  const docSnap = await getDoc(docRef);

  if( docSnap.exists()){
    return docSnap.data();
  }else {
    return 'no hay info';
  }
} 

export const obtenerTodosLosDatos = async (loginStatus) => {
  const querySnapshot = await getDocs(collection(db, `revisitas-${loginStatus}`));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push( doc.data());
  });
  return data;
} 

export const borrarDato = async (id) => {
  await deleteDoc(doc(db, 'revisitas', id));
}

export const revisitaActualizar = async (loginStatus,id, newName, newNumber, newInterest) => {
  const revisitaAActualizar = doc(db, `revisitas-${loginStatus}`, id);

  await updateDoc(revisitaAActualizar, {
    name:newName,
    number:newNumber, 
    interest:newInterest
  });
}