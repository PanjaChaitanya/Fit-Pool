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
    }, [])
    if(loading){
      return (
        <div className='flex align-middle items-center min-h-screen'>
          <p className='text-green-500 text-4xl text-center'>Checking user valid or not.....</p>
        </div>
      )
    }

  return user ? children : <Navigate to='/' replace/>
}

export default ProtectedRoute