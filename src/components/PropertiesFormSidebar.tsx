import useDesigner from './hooks/useDesigner'
import { FormElements } from './FormElements';
import { AiOutlineClose } from 'react-icons/ai';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

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

        <Button size={"icon"} variant={"ghost"} onClick={()=>{
            setSelectedElement(null)
        }}>
            <AiOutlineClose/>
        </Button>
    </div>
    <Separator className='mb-4 border'/>
      <PropertiesForm elementInstance={slectedElement}/>
  </div>
  )
}

export default PropertiesFormSidebar
