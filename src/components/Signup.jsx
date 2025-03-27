import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
const Signup = ({isOpen, onClose}) => {
  
  const [isActive, setIsActive] = useState(false);

  //states for user register (Sign Up) details
  const [userName, setUserName] = useState('') ;
  const [signUpEmail, setSignUpEmail] = useState('') ;
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmSignUpPassword, setConfirmSignUpPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // states for user sign in details
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInError, SetSignInError] = useState('')

  //navigation on successful login
  const navigate = useNavigate()

 //toggle the whole modal
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen || user) return null; // Prevent rendering if user is logged in

  //function to create a user(Sign up)
  let onSignUp = async (e) =>{
    //to prevent page reload
    e.preventDefault();
   
    if (signUpPassword !== confirmSignUpPassword) {
      setErrorMessage("Password not matched")
      return;
    }
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      console.log("User added:", userCredential.user);
      setErrorMessage("Account created Click Sign In to continue");
    }catch(error){
      console.error("Signup Error:", error);
      setErrorMessage(error.message);
    }
  }

  let onSignIn = async (e) => {
     //to prevent page reload
     e.preventDefault();

     try{
      const userCredential = await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      console.log('logged in succsesfully :',userCredential.user)

      //navigating to exercises page after successfull login
      navigate('/searchexercises')
      SetSignInError('')
     }catch(error){
      console.log( error.message)
      SetSignInError(error.code)
     }

  }
 
 
  return (
    <>
      <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
        <div className={`relative  bg-white rounded-3xl shadow-lg overflow-hidden w-3xl min-h-[480px] ${isActive ? 'active' : ''}`}>
          <button onClick={onClose} className="absolute z-50 top-3 right-3 text-gray-600 text-xl">
            ✖
          </button>
          {/* Sign Up Form */}
          <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${isActive ? 'opacity-100 z-10 translate-x-full' : 'opacity-0 -z-10'}`}>
            <form onSubmit={onSignUp} className="flex flex-col items-center justify-center h-full px-10">
              <h1 className="text-3xl montserratFont  font-bold">Create Account</h1>
              <div className="flex my-4 space-x-3">
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-blue-300 hover:text-white transition">
                <img src="/icons/google.png" alt="" />
              </a>
              </div>
              <span className="text-xs">or use your email for registration</span>
              <TextField 
                label='User Name' 
                type="text" variant='standard' 
                placeholder="Enter user name"
                value={userName} 
                onChange={(e)=>setUserName(e.target.value)} 
                required inputProps={{ minLength: 4 }}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />            
              <TextField
                label="Email Address"
                variant='standard'
                type="email"
                value={signUpEmail}
                onChange={(e)=>setSignUpEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <TextField
                label='Password'
                type="password"
                variant='standard'
                value={signUpPassword}
                onChange={(e)=>setSignUpPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <TextField
                label='Confirm Password'
                type="password"
                variant='standard'
                value={confirmSignUpPassword}
                onChange={(e)=>setConfirmSignUpPassword(e.target.value)}
                required
                placeholder="Re-Enter password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              <button type='submit' className="btnFonts px-6 py-2 mt-4 text-white bg-red-700 rounded-md">SIGN UP</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${isActive ? '-translate-x-full opacity-0 -z-10' : 'opacity-100 z-10'}`}>
            <form onSubmit={onSignIn} className="flex flex-col items-center justify-center h-full px-10">
              <h1 className="text-xl font-bold">SIGN IN</h1>
              <div className="flex my-4 space-x-3">
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-blue-300 hover:text-white transition">
                <img src="/icons/google.png" alt="" />
              </a>
              </div>
              <span className="text-xs">or use your email password</span>
              <TextField
                label="Email Address"
                variant='standard'
                type="email"
                value={signInEmail}
                onChange={(e)=>setSignInEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <TextField
                label='Password'
                type="password"
                variant='standard'
                value={signInPassword}
                onChange={(e)=>setSignInPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <a href="#" className="mt-2 text-xs text-gray-600">Forget Your Password?</a>

              <p className="text-red-500 mt-2">{signInError}</p>
              <button type='submit' className="btnFonts px-6 py-2 mt-4 text-white bg-red-700 rounded-md">Sign In</button>
            </form>
          </div>

          {/* Toggle Panel */}
          <div className={`absolute top-0 left-1/2 w-1/2 h-full rounded-br-4xl transition-all duration-500 ${isActive ? '-translate-x-full' : ''}`}>
            <div className="flex flex-col gap-5 items-center justify-center h-full p-5 text-center text-white bg-red-700">
              <div className='app-logo-signup '>
                <img src="/images/fitpool.png" className='max-w-[150px] rounded-full  shadow-2xl border-2 border-red-400' alt="" />
              </div>
              {isActive ? (
                <>
                <div className=''>
                  <h1 className="text-2xl font-bold text-white">Hello, Friend!</h1>
                  <p className="mt-2">Register with your details to use all of site features →</p>
                </div>
                <div className=''>
                  <p className='text-white'> Already have an account?</p>
                  <button onClick={() => setIsActive(false)} className="btnFonts px-6 py-2 mt-4 border border-white rounded-md">SIGN IN</button>
                </div>
                </>
              ) : (
                <>
                <div>
                  <h1 className="text-xl text-white montserratFont font-bold">Welcome Back!</h1>
                  <p className="mt-2">← Enter your details to use all of site features</p>
                </div>
                <div>
                  <p className="text-white">Don&apos;t have an account?</p>
                  <button onClick={() => setIsActive(true)} className="btnFonts px-6 py-2 mt-4 border border-white rounded-md">SIGN UP</button>
                </div>
                </>
              )}
            </div>
          </div>
      </div>
    </div>
    </>
  );
}

export default Signup;
