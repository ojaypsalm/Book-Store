import React from 'react'
import {BsArrowLeft } from 'react-icons/bs'
import { Link } from "react-router-dom"; 

const BackButton = ({ destination ='/home' }) => {
  return (
    <div className='flex'>
        <Link to= { destination }
        className='bg-sky-800 text-red px-4 py-1 rounded-lg w-fit'
        >
          <BsArrowLeft className='text-2x1' />

        </Link>
    </div>
  )
}

export default BackButton