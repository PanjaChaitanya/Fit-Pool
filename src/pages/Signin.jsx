import { TextField,Button } from "@mui/material"
const Signin = () => {
  return (
    <div className="body-container min-h-screen flex items-center justify-center">
      <div className="login-container relative w-3xl h-96 shadow-2xl shadow-red-500 overflow-hidden ">
      <div className="curved-shape absolute right-0 top-[-5px] h-[600px] w-[850px] bg-[linear-gradient(45deg,_black,_red)] rotate-10 transform skew-y-[40deg] origin-bottom-right"></div>
        <div className="from-box flex items-start justify-center flex-col absolute top-0 w-full h-full">
          <h2 className="text-center align-middle">Sign in</h2>
          <form action="#">
            <div className="input-box flex flex-col">
              <TextField
                className="relative w-full h-12"
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
        <div className="login-info-container Login absolute top-0 h-full w-1/2 flex flex-col justify-center text-white">
          <h2 className="text-4xl text-white">WELCOME BACK!</h2>
          <p>Enter your previously registerd details, to login into the Fit pool</p>
        </div>
      </div>
    </div>
  )
}

export default Signin