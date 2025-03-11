import NavSideBar from '../components/NavSideBar'


const Contact = () => {
  return (
    <div className='flex'>
        {/* contact block */}
        <div className='flex-1 align-middle justify-center max-h-screen'>
            <div>
                <h1 className='text-3xl font-bold'>Contact <span className='text-red-500'>Me</span></h1>
                <p className='text-lg'>Contact us for any questions or concerns.</p>
            </div>
            <div className='flex'>
                {/* contact form block */}
                <div className='contact-form'>
                    <form className='flex flex-col'>
                        <label className='text-lg'>Name:</label>
                        <input type='text' className='border border-gray-500 p-2' />
                        <label className='text-lg'>Email:</label>
                        <input type='email' className='border border-gray-500 p-2' />
                        <label className='text-lg'>Message:</label>
                        <textarea className='border border-gray-500 p-2' />
                    </form>
                </div>
                {/* contact info block */}
                <div className="contact-info">
                    <div className="contact-info-header">
                        Contact Info
                    </div>
                    <div className="contact-info-content">
                        <div className="contect-info-content-line">
                            <img src="/icons/icon-name.png" className="icon" alt="name-icon"/>
                            <div className="contact-info-text">
                                <h6>Name</h6>
                                <p>Chaitanya Panja</p>
                            </div>
                        </div>
                        <div className="contect-info-content-line">
                            <img src="/icons/icon-location.png" className="icon" alt="location-icon"/>
                            <div className="contact-info-text">
                                <h6>Location</h6>
                                <p>Andhra Pradesh State, Bhimavaram</p>
                            </div>
                        </div>
                        <div className="contect-info-content-line">
                            <img src="/icons/icon-phone.png" className="icon" alt="phone-icon"/>
                            <div className="contact-info-icon-text">
                                <h6>Call</h6>
                                <p>+91 9059944125</p>
                            </div>
                        </div>
                        <div className="contect-info-content-line">
                            <img src="./images/icon-email.png" className="icon" alt="email-icon"/>
                            <div className="contact-info-icon-text">
                                <h6>Email</h6>
                                <p>panjachaitanya23@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
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