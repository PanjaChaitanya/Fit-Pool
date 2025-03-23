import { useState } from 'react';
import { TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utilities/firebase';
const Signup = ( ) => {



  //states for user details
  const [userName, setUserName] = useState('') ;
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [redClass, setRedClass] = useState('')
  let onSignUp = async (e) =>{
    //to prevent page reload
    e.preventDefault();
    if (!email || !userName || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setRedClass('error')
      return;
    }
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User added:", userCredential.user);
      setErrorMessage("user added");
    }catch(error){
      console.error("Signup Error:", error);
      setErrorMessage(error.message);
    }
  }

 
 
  return (
    <>
      <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="relative bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
          <div className="absolute top-4 right-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h2 className="text-center text-2xl font-semibold text-red-600 mb-4">
             Sign Up
          </h2>
          <form onSubmit={onSignUp}>
            <TextField 
              label='User Name' type="text" variant='standard' placeholder="Enter user name"
              value={userName} onChange={(e)=>setUserName(e.target.value)} 
              required inputProps={{ minLength: 4 }}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            
      
              <TextField
                label="Email Address"
                variant='standard'
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <TextField
                label='Password'
                type="password"
                variant='standard'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
                <TextField
                  label='Confirm Password'
                  type="password"
                  variant='standard'
                  color= {redClass}
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-Enter password"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                <div className="flex items-center justify-center gap-4">
                  <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                    Sign Up
                  </button>
                  <button type="button" className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400">
                    Sign Up with Google
                  </button>
                </div>
          </form>
          
                
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:underline">
              Already have an account?
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
