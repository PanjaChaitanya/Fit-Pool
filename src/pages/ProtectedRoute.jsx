import {useState,useEffect} from 'react'
import { auth } from '../utilities/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentuser)=>{
        setUser(currentuser)
        setLoading(false)
      })
      return () => unsubscribe();
    }, )
    if(loading){
      return <p>Loading.....</p>
    }

  return user ? children : <Navigate to='/'></Navigate>
}

export default ProtectedRoute