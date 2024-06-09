import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from './elements/BackButton.jsx'
import Spinner from './elements/spinner.jsx'


const ShowBooks = () => {

  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true)
     axios.get(`http://localhost:3001/api/books/${ id }`)
     .then((response)=>{
      setBook(response.data)
      setLoading(false)

     }) 
     .catch((error)=>{
      console.log(error)
      setLoading(false)
     })
  }, [id])

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