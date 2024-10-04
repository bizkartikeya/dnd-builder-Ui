import { useDraggable } from '@dnd-kit/core';
import { FormElement } from './FormElements'

const SidebarBtnElement = ({formElement}:{formElement:FormElement}) => {
   const {label,icon:Icon}=formElement.designerBtnElelemnts;
   const draggable=useDraggable({
    id:`designer-btn-${formElement.type}`,
    data:{
        type:formElement.type,
        isDesignerBtnElement:true,
    },
   });
    return (
    <button ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} 
    className={`flex flex-col outline rounded-lg items-center justify-center gap-2 h-[120px] w-[120px] cursor-grab ${draggable.isDragging? "ring-2 ring-rose-500":""}`}>
      <Icon className="h-8 w-8 text-primary cursor-grab"/>
      <p className='text-xs'>{label}</p>
    </button>
  )
}

export const SidebarBtnElementDragOverlay = ({formElement}:{formElement:FormElement}) => {
    const {label,icon:Icon}=formElement.designerBtnElelemnts;
    
     return (
     <button 
     className='flex flex-col outline rounded-lg items-center justify-center gap-2 h-[120px] w-[120px] cursor-grab'>
       <Icon className="h-8 w-8 text-primary cursor-grab"/>
       <p className='text-xs'>{label}</p>
     </button>
   )
 }

export default SidebarBtnElement
