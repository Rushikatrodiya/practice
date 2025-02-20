import { ReactElement, ComponentType } from "react";
import BaseErrorMessage from "../ui/BaseErrorMessage";
import BaseLabel from "../ui/BaseLabel";

type IFormFieldProps<T> = {
  label: string;
  name: string;
  component: ComponentType<T>; // Accepts any React component
  error?: string;
} & T; // Spreads additional props to the component

export default function FormField<T>(props: IFormFieldProps<T>): ReactElement {
  const { label, name, component: Component, error, ...componentProps } = props;

  return (
    <div className="mb-4">
      <BaseLabel htmlFor={name} labeltitle={label} />
      <Component id={name} {...(componentProps as T)} />
      {error && <BaseErrorMessage error={new Error(error)} />}
    </div>
  );
}
