import React from 'react'
import NavSideBar from '../components/NavSideBar'


const Contact = () => {
  return (
    <div className='flex'>
        <div className='flex-1'>
            <h1 className='text-3xl font-bold'>Contact</h1>
            <p className='text-lg'>Contact us for any questions or concerns.</p>
        </div>
        <div className='flex-1'>
            <form className='flex flex-col'>
                <label className='text-lg'>Name:</label>
                <input type='text' className='border border-gray-500 p-2' />
                <label className='text-lg'>Email:</label>
                <input type='email' className='border border-gray-500 p-2' />
                <label className='text-lg'>Message:</label>
                <textarea className='border border-gray-500 p-2' />
            </form>
        </div>
        <div>
            <NavSideBar />
        </div>
    </div>
  )
}

export default Contact