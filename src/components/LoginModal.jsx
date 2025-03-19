import { useState } from 'react';
import { TextField } from '@mui/material';
const LoginModal = ({ isOpen, onClose }) => {


  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  
  if (!isOpen) return null;

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };
 

  return (
    <>
      <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="relative bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
            {isLogin ? 'Not Yet integrated 😊' : 'Sign Up'}
          </h2>


          <form>
            <div className="mb-4">
              <TextField
                label="Email Address"
                variant='standard'
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-4">
              <TextField
                label='Password'
                type="password"
                variant='standard'
                id="password"
                name="password"
                required
                placeholder="Enter password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              ></TextField>
            </div>

            {!isLogin && (
              <div className="mb-4">
                <TextField
                  label='Confirm Password'
                  type="password"
                  variant='standard'
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="Re-Enter password"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
               
              >
                {isLogin ? 'Login with Google' : 'Sign Up with Google'}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button onClick={handleToggleForm} className="text-sm text-red-600 hover:underline">
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
