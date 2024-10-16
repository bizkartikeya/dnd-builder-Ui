import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";
export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElelemnts: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance:FormElementInstance
  }>;
  formComponent: React.FC;
  porpertiesComponent:  React.FC<{
    elementInstance:FormElementInstance
  }>;
};
export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
