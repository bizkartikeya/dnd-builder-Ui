import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import Designer from "./Designer"
import PreviewDialogBtn from "./PreviewDialogBtn"
import PublishFormBtn from "./PublishFormBtn"
import SaveFormBtn from "./SaveFormBtn"
import DragOverlayWrapper from "./DragOverlayWrapper"

const Formbuilder = () => {
  const mouseSensors = useSensor(MouseSensor,{
    activationConstraint:{
      distance:10,
    }
  })
  const sensors = useSensors(mouseSensors)
  return (
    <DndContext sensors={sensors}>
    <main className='flex flex-col w-full'>
      <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          Form
        </h2>
        <div className="flex items center gap-2">
          <PreviewDialogBtn/>
          <SaveFormBtn/>
          <PublishFormBtn/>
        </div>
      </nav>
      <div className={`flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[500px] bg-accent bg-[url(paper.svg)] dark:bg-[url(paper-dark.svg)]"`}><Designer/></div>
    </main>
    <DragOverlayWrapper/>
    </DndContext>
  )
}

export default Formbuilder
