import React from 'react'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import { MdOutlineDelete} from 'react-icons/md'
import { Link } from "react-router-dom";

const BooksTable = ({books}) => {
  return (

    <div>
                  <table className='w-full border-separate border-spacing'>
              <thead>
                <tr>
                  <th className=' border border-slate-600 rounded md'>NO:</th>
                  <th className='border border-slate-600 rounded md'>Title</th>
                  <th className='border border-slate-600 rounded md max-md-:hidden'>Author</th>
                  <th className='border border-slate-600 rounded md max-md-:hidden'>Published Year</th>
                  <th className='border border-slate-600 rounded md max-md-:hidden'>Book Image</th>
                  <th className='border border-slate-600 rounded md max-md-:hidden'>Operations</th>

                </tr>
              </thead>
              
              <tbody>
                {
                  books.map((book, index)=>{
                    return (
                      <tr key={book._id} className='h-8'>
                      <td className='border border-slate-700 rounded-md text-center'>
                        {index + 1}
                      </td>
                      <td className='border border-slate-700 rounded-md text-center'>
                        {book.title}
                      </td>
                      <td className='border border-slate-700 rounded-md text-center max-md-:hidden'>
                        {book.author}
                      </td>
                      <td className='border border-slate-700 rounded-md text-center max-md-:hidden'>
                        {book.publishedYear}
                      </td>
                      <td className='border border-slate-700 rounded-md text-center max-md-:hidden'>
                        {/* <Link to={book.imageUrl}>
                        Image Link
                        </Link> */}
                        <img src={book.imageUrl} alt='' className='w-1/6 h-1/6' />
                      </td>
                      <td className='border border-slate-700 rounded-md text-center max-md-:hidden'>
                        <div className='flex justify-center gap-w-4'>
                            <Link to={`/books/details/${book._id }`} >
                              <BsInfoCircle className='text-2xl text-green-800 mx-3' />
                            </Link>

                            <Link to={`/books/edit/${book._id }`} >
                              <AiOutlineEdit className='text-2xl text-yellow-500 mx-3' />
                            </Link>

                            <Link to={`/books/delete/${book._id }`} >
                              <MdOutlineDelete className='text-2xl text-red-600 mx-3' />
                            </Link>
                        </div>
                      </td>

                    </tr>
                    

                    )                  
                  })
                  
                }

              </tbody>
              
            </table>
    </div>
  )
}

export default BooksTable