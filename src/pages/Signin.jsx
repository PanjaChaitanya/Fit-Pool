import { TextField,Button } from "@mui/material"
const Signin = () => {
  return (
    <div 
    className="login-container 
    flex justify-center items-center min-h-screen
     bg-red-400 relative">
      <div className="from-box flex flex-col">
        <h2>Sign in</h2>
        <form action="#">
          <div className="input-box flex flex-col">
            <TextField
              variant="standard"
              label="Email"
              placeholder="Enter your mail id"
            />
            <TextField
              variant="standard"
              label="Password"
              placeholder="Enter your password"
            />
            <Button color="error"
            variant="contained"
            >Login </Button>
            <div className="signup-link">
              <p>Dont have an account? <span className="text-red-600"><a href="#">Signup</a></span></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin