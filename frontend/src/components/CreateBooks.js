import React, { useState } from 'react'
import BackButton from './elements/BackButton'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBooks = () => {

  const [title, setTitle] =  useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const authBook= process.env.REACT_APP_API_URL
  const token = localStorage.getItem('token')

  const handleSaveBook = ()=>{
    if(!title || !author || !publishedYear || !image){
      toast.error('fill up all details')
      return;

    }
    if(!token){
      toast.error('Authorization required, please log in')
    }

    const headers = {
      Authorization: `Bearer ${token}`
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishedYear', publishedYear);
    formData.append('image', image);
    
    console.log(image, 'image')
    setLoading(true)

    axios.post(`${authBook}`, formData, { headers })
    
    .then(()=>{
      setLoading(false)
      toast.success('Book Added Successfully ')
      setTimeout(()=>{
        navigate('/home')
      }, 3000)
      
    })
    .catch((error)=>{
      console.error('Error:', error.response);
      toast.error('Error: ' + error.response);
    })

  }

  
  return (
    
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto rounded-mg'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              required
              onChange={(e)=>setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-full'
            />
            
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type='text'
              value={author}
              required
              onChange={(e)=>setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-full'
            />
            
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Published Year</label>
            <input
              type='text'
              value={publishedYear}
              required
              onChange={(e)=>setPublishedYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-full'
            />
            
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Upload Book Image</label>
            <input
              type='file'
              accept='image/'
              required
              onChange={(e)=>setImage(e.target.files[0])}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-full'
            />
            
          </div>

          <button className='p-2 bg-sky-300 m-8 rounded-full'
          onClick={handleSaveBook}
          >
            Save
          </button>
      </div>
      <ToastContainer />
       
    </div>
    
  )
}

export default CreateBooks