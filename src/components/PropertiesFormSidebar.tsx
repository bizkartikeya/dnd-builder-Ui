import useDesigner from './hooks/useDesigner'
import { FormElements } from './FormElements';
import { AiOutlineClose } from 'react-icons/ai';

const PropertiesFormSidebar = () => {
    const {slectedElement,setSelectedElement} = useDesigner();
    if(!slectedElement) return null;
const PropertiesForm = FormElements[slectedElement?.type].porpertiesComponent

  return (
  <div className="flex flex-col p-2">
    <div className='flex justify-between items-center'>
        <p className='text-md text-foreground/70'>
Elements Properties
        </p>

        <button className='outline p-1 rounded-md' onClick={()=>{
            setSelectedElement(null)
        }}>
            <AiOutlineClose/>
        </button>
    </div>
      <PropertiesForm elementInstance={slectedElement}/>
  </div>
  )
}

export default PropertiesFormSidebar
