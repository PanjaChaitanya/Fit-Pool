import { useState } from 'react';
import { TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utilities/firebase';
const Signup = ( ) => {

  const [isActive, setIsActive] = useState(false);

  //states for user details
  const [userName, setUserName] = useState('') ;
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  let onSignUp = async (e) =>{
    //to prevent page reload
    e.preventDefault();
    if (!email || !userName || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password not matched")
      return;
    }
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User added:", userCredential.user);
      setErrorMessage("Account created Click Sign In to continue");
    }catch(error){
      console.error("Signup Error:", error);
      setErrorMessage(error.message);
    }
  }

 
 
  return (
    <>
    <div className={`flex items-center flex-wrap justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200`}>
      <div className={`relative  bg-white rounded-3xl shadow-lg overflow-hidden w-[768px] min-h-[480px] ${isActive ? 'active' : ''}`}>
        {/* Sign Up Form */}
        <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${isActive ? 'opacity-100 z-10 translate-x-full' : 'opacity-0 -z-10'}`}>
          <form onSubmit={onSignUp} className="flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-xl font-bold">Create Account</h1>
            <div className="flex my-4 space-x-3">
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-red-500 hover:text-white transition">
              <i className="fa-brands fa-google-plus-g text-red-500 text-lg"></i>
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
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              placeholder="Re-Enter password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <button type='submit' className="px-6 py-2 mt-4 text-white bg-red-700 rounded-md">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${isActive ? '-translate-x-full opacity-0 -z-10' : 'opacity-100 z-10'}`}>
          <form className="flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-xl font-bold">Sign In</h1>
            <div className="flex my-4 space-x-3">
              <a href="#" className="p-2 border rounded-full"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="p-2 border rounded-full"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="p-2 border rounded-full"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="p-2 border rounded-full"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span className="text-xs">or use your email password</span>
            <input type="email" placeholder="Email" className="w-full px-3 py-2 mt-2 bg-gray-200 rounded-md" />
            <input type="password" placeholder="Password" className="w-full px-3 py-2 mt-2 bg-gray-200 rounded-md" />
            <a href="#" className="mt-2 text-xs text-gray-600">Forget Your Password?</a>
            <button type='submit' className="px-6 py-2 mt-4 text-white bg-purple-700 rounded-md">Sign In</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full transition-all duration-500 ${isActive ? '-translate-x-full' : ''}`}>
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white bg-red-700">
            <div className='app-logo-signup '>
              <img src="/images/fitpool.png" className='max-w-[150px] rounded-full  shadow-2xl border-2 border-red-400' alt="" />
            </div>
            {isActive ? (
              <>
                <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                <p className="mt-2">Register with your personal details to use all of site features</p>
                <button onClick={() => setIsActive(false)} className="px-6 py-2 mt-4 border border-white rounded-md">Sign In</button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="mt-2">Enter your personal details to use all of site features</p>
                <button onClick={() => setIsActive(true)} className="px-6 py-2 mt-4 border border-white rounded-md">Sign Up</button>
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
