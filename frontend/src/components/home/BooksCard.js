import React from 'react'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({books}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

      {
        books.map((book)=>{
          return (
            <div>
              <BookSingleCard key={book._id} book={books} />

            </div>

          )

        })
      }

      </div>
  )
}

export default BooksCard