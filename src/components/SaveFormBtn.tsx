import React from 'react'
import { HiSave } from 'react-icons/hi'

const SaveFormBtn = () => {
  return (
    <button className='outline outline-indigo-500 items-center text-white rounded-lg p-2 bg-blue-400 flex gap-2'><HiSave className='h-4 w-4'/> Save Form</button>

  )
}

export default SaveFormBtn
