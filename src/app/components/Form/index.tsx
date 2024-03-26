import { FormEventHandler } from "react";

const Form = ({
  onSubmit,
  name,
  children,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  name: string;
  children: JSX.Element;
}) => {
  return (
    <form onSubmit={onSubmit} name={name}>
      {children}
    </form>
  );
};
export default Form;
