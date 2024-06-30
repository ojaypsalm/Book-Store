import React, { useState, useEffect } from 'react'
import BackButton from './elements/BackButton'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom'

const EditBooks = () => {

  const [title, setTitle] =  useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [editedBook, setEditedBook] =  useState([])
  const { id } = useParams();
  const navigate = useNavigate()
  const authBook= process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token')

  useEffect(()=>{

    if(!token){
      toast.error('Authorization required, please log in')
    }

    const headers = {
      Authorization: `Bearer ${token}`
    }

    setLoading(true)
    axios.get(`${authBook}/${id}`, {headers})
    .then((res)=>{
      setEditedBook(res.data)
      setLoading(false)
    })
    .catch((error)=>{
      toast.error('Error: ', error)
    })
  }, [] )



  const handleEditBook = ()=>{
    if(!title || !author || !publishedYear){
      toast.error('fill up all details')

    }

    const data = {
      title: title,
      author: author,
      publishedYear: publishedYear
    }

    if(!token){
      toast.error('Authorization required, please log in')
    }

    const headers = {
      Authorization: `Bearer ${token}`
    }


    setLoading(true)

    axios.put(`${authBook}/${id}`, data, {headers})
    .then(()=>{
      setLoading(false)
      toast.success('Book Edited Successfully ')
      setTimeout(()=>{
        navigate('/home')
      }, 3000)
      
    })
    .catch((error)=>{
      console.log(error)
      toast.error('Error: ', error)
    })

  }

  
  return (
    
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto rounded-mg'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              placeholder={editedBook.title}
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
              placeholder={editedBook.author}
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
              placeholder={editedBook.publishedYear}
              value={publishedYear}
              required
              onChange={(e)=>setPublishedYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-full'
            />
            
          </div>

          <button className='p-2 bg-sky-300 m-8 rounded-full'
          onClick={handleEditBook}
          >
            Save
          </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditBooks