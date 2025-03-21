import NavSideBar from '../components/NavSideBar'
import { Button, TextField } from '@mui/material'
import { motion } from 'framer-motion'
const Contact = () => {
  return (
    <div className='flex'>
        {/* contact block */}
        <div className='flex-1 flex flex-col gap-10 align-middle justify-center max-h-screen overflow-y-auto red-scrollbar no-scrollbar'>
            <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-center'>
                <h1 className='text-3xl font-bold montserratFont'>Contact <span className='text-red-500'>Me</span></h1>
                <p className='text-lg'>Contact us for any questions or concerns.</p>
            </motion.div>
            <div className='flex flex-wrap justify-center gap-x-10 align-middle'>
                {/* contact form block */}
                <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='contact-form flex flex-col gap-5'>
                    <div className='form-header text-center text-2xl font-bold montserratFont'>
                        Message me
                    </div>
                    <form className='flex flex-col gap-5'>
                        <TextField className='w-3xs' label="Name" type='text' placeholder='Enter your name' variant='standard'></TextField>
                        <TextField className='w-3xs' label="Email" type='email' placeholder='Enter your email' variant='standard'></TextField>
                        <TextField id="filled-textarea" label="Message" placeholder="Enter your message here" multiline variant="filled"/>
                    </form>
                    <div>
                        <Button className='btnFonts' variant='outlined' >
                            Send Message
                        </Button>
                    </div>
                </motion.div>
                {/* contact info block */}
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.4}}
                    className="contact-info  flex flex-col gap-10">
                    <div className="contact-info-header text-center text-2xl font-bold montserratFont">
                        Contact Info
                    </div>
                    <div className="contact-info-content flex flex-col gap-5">
                        <div className="contect-info-content-line flex gap-5">
                            <img src="/icons/icon-name.png" className="icon" alt="name-icon"/>
                            <div className="contact-info-text">
                                <h6>Name</h6>
                                <p>Chaitanya Panja</p>
                            </div>
                        </div>
                        <div className="contect-info-content-line flex gap-5">
                            <img src="/icons/icon-location.png" className="icon" alt="location-icon"/>
                            <div className="contact-info-text">
                                <h6>Location</h6>
                                <p>Andhra Pradesh State, Bhimavaram</p>
                            </div>
                        </div>
                        <div className="contect-info-content-line flex gap-5">
                            <img src="/icons/icon-phone.png" className="icon" alt="phone-icon"/>
                            <div className="contact-info-text">
                                <h6>Call</h6>
                                <p>+91 9059944125</p>
                            </div>
                        </div>
                        <div className="contect-info-content-line flex gap-5">
                            <img src="/icons/icon-email.png" className="icon" alt="email-icon"/>
                            <div className="contact-info-text">
                                <h6>Email</h6>
                                <p>panjachaitanya23@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        {/* nav side bar block */}
        <div>
            <NavSideBar />
        </div>
    </div>
  )
}

export default Contact