import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 items-center flex justify-center '>

        <div className='bg-white shadow-lg p-4 rounded max-w-5xl mx-auto '>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>


                <div className='flex max-w-[80vh] max-h-[80vh] justify-center p-4 '>
                <img src={imgUrl} className='w-full h-full'/>
                </div>
        </div>
  


    </div>
  )
}

export default DisplayImage