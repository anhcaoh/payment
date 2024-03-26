export interface IButton {
  id?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outlined";
  name?: string;
  children?: string | JSX.Element;
}
const Button = ({
  type = "button",
  variant = "primary",
  id,
  name,
  children,
}: IButton) => {
  return (
    <button
      type={type}
      id={id}
      name={name}
      className={[
        "py-2 px-6 uppercase font-bold text-base",
        "active:scale-95 duration-100 ease-in-out rounded-sm",
        variant === "primary" ? "bg-omf-green text-white" : "",
        variant === "outlined" ? "border-2" : "",
      ]
        .join(" ")
        .trim()}
    >
      {children}
    </button>
  );
};

export default Button;
