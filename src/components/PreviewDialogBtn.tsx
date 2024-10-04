import { MdPreview } from 'react-icons/md'

const PreviewDialogBtn = () => {
  return (
   <button className='outline outline-gray-500 items-center text-white rounded-lg p-2 bg-blue-400 flex gap-2'><MdPreview className='h-6 w-6'/> Preview</button>
  )
}

export default PreviewDialogBtn
