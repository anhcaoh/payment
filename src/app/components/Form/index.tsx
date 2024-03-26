const Form = ({ name, children }: { name: string; children: JSX.Element }) => {
  return <form name={name}>{children}</form>;
};
export default Form;
