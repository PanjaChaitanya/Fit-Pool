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
        <div className='grid min-h-screen place-items-center bg-[var(--bg-main)]'>
          <p className='text-sm text-[var(--text-muted)]'>Checking authentication...</p>
        </div>
      )
    }

  return user ? children : <Navigate to='/' replace/>
}

export default ProtectedRoute
