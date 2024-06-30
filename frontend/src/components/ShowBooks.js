import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from './elements/BackButton.jsx'
import Spinner from './elements/Spinner.jsx'



const ShowBooks = () => {

  const [book, setBook] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const showBook = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const headers = {
      Authorization: `Bearer ${token}`
    }

    setLoading(true);
     axios.get(`${showBook}/${id}`,{ headers })
     .then((response)=>{
      console.log(response.data);
      setBook(response.data)
      setLoading(false)

     }) 
     .catch((error)=>{
      console.log(error)
      setLoading(false)
     })
  }, [id, showBook])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      
      {
        loading ? (
          <Spinner />
        ): (
          <div className='flex flex-col border-2  border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span >{book._id}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>title</span>
              <span >{book.title}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>author</span>
              <span >{book.author}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>publishedYear</span>
              <span >{book.publishedYear}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>createdBy</span>
              <span >{book.createdBy}</span>
            </div>
            

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Image Url </span>
              <span >{book.imageUrl}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Date created</span>
              <span >{new Date().toString(book.createdAt)}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Date updated</span>
              <span >{new Date().toString(book.updatedAt)}</span>
            </div>
          </div>


          

          


        )
      }


    </div>
  )




}

export default ShowBooks