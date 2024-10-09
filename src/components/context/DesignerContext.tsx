import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement:(id:string,element:FormElementInstance)=>void;
  slectedElement: FormElementInstance|null;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<FormElementInstance | null>
  >;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

const DesignerContextProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [slectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement=(id:string, element:FormElementInstance)=>{
    setElements((prev)=>{
        const newElement=[...prev];
        const index = newElement.findIndex((el)=>el.id===id);
        newElement[index]=element;
        return newElement
    })
  }

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        slectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerContextProvider;
