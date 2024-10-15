import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import idGenerator from "./hooks/idGenerator";
import useDesigner from "./hooks/useDesigner";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { elements, addElement,slectedElement,setSelectedElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea=over.data?.current?.isDesignerDropArea;

      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }
const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;
const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf||isDroppingOverDesignerElementBottomHalf
      const droppingSidebarBtnOverDesignerElement=isDesignerBtnElement && isDroppingOverDesignerElement


      if(droppingSidebarBtnOverDesignerElement){
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        const overId = over.data?.current?.elementId
const overElementindex = elements.findIndex((el)=>el.id===overId)
if(overElementindex===-1){
  throw new Error("Element not found")
}
let indexForNewElement = overElementindex
if (isDroppingOverDesignerElementBottomHalf){
  indexForNewElement=overElementindex+1;
}

        addElement(indexForNewElement, newElement);
        return;
      }
    },
  });

  const DesignerElementWrapper = ({
    element,
  }: {
    element: FormElementInstance;
  }) => {
    const { removeElement, setSelectedElement,slectedElement } = useDesigner();
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const topHalf = useDroppable({
      id: element.id + "-top",
      data: {
        type: element.type,
        elementId: element.id,
        isTopHalfDesignerElement: true,
      },
    });
    const bottomHalf = useDroppable({
      id: element.id + "-bottom",
      data: {
        type: element.type,
        elementId: element.id,
        isBottomHalfDesignerElement: true,
      },
    });
    const draggable = useDraggable({
      id: element.id + "-drag-handler",
      data: {
        type: element.type,
        elementId: element.id,
        isDesignerElement: true,
      },
    });
    if (draggable.isDragging) return null;

    const DesignerElement = FormElements[element.type].designerComponent;

    return (
      <div
        // ref={draggable?.setNodeRef}
        // {...draggable?.listeners}
        // {...draggable?.attributes}
        className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer"
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onClick={(e)=>{
          e.stopPropagation(),
          setSelectedElement(element)}}
        onMouseLeave={(e) => {
          setMouseIsOver(false);
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className={`absolute w-full h-1/2 rounded-t-md`}
        />
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute w-full bottom-0 h-1/2 rounded-b-md"
        />
        {mouseIsOver && (
          <>
            <div className="absolute right-0 h-full" >
              <button
                onClick={(e) => {
                  e.stopPropagation(),
                  removeElement(element.id);
                }}
                className="flex justify-center items-center h-full border rounded-md rounded-l-none bg-red-500"
              >
                <BiSolidTrash className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p className="text-muted-foreground text-sm">
                Click for properties or drag to move
              </p>
            </div>
          </>
        )}
        {topHalf.isOver&&(
          <div className="bg-primary absolute top-0 w-full rounded-b-none rounded-md h-[7px]"/>
        )}
        {bottomHalf.isOver&&(
          <div className="bg-primary absolute bottom-0 w-full rounded-t-none rounded-md h-[7px]"/>
        )}
        <div
          className={`flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none ${
            mouseIsOver ? "opacity-30" : "opacity-100"
          }`}
        >
          <DesignerElement elementInstance={element} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-full">
      <div className="p-2 w-full" onClick={()=>{
        if(slectedElement) setSelectedElement(null)
      }}>
        <div
          ref={droppable.setNodeRef}
          className={`bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow ${
            elements.length === 0 ? "items-center" : "items-start"
          } justify-start flex-1 overflow-y-auto ${
            droppable.isOver ? "ring-2 ring-rose-500" : ""
          }`}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length===0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-2">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
