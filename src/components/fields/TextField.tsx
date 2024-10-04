import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";

const type:ElementsType="TextField";

const extraAttributes={
    label:"Text Field",
    helperText:"Helper Text",
    required:false,
    placeholder:"Value here...",
}

export const TextFieldFormElement:FormElement={
    type,
construct:(id:string)=>({
    id,
    type,
    extraAttributes,
}),
designerBtnElelemnts:{
    icon: MdTextFields,
    label:"Text Field",
},

    designerComponent:DesignerComponent,
    formComponent:()=><div>Form Component</div>,
    porpertiesComponent:()=><div>Properties Component</div>,
}

type CustomInstance=FormElementInstance&{
    extraAttributes: typeof extraAttributes;
}

function DesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {label,required,placeholder,helperText}=element.extraAttributes;
    return (
        <div className="bg-foreground rounded-md p-2 flex flex-col gap-2 w-full">
            <label htmlFor="">{label}{required&& "*"}</label>
            <input className="rounded-md bg-transparent border p-1 w-full" type="text" readOnly disabled placeholder={placeholder} />
            {helperText&& (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
            </div>
    )
}