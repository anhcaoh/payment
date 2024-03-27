export interface IButton {
  id?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outlined";
  name?: string;
  disabled?: boolean;
  children?: string | JSX.Element;
}
const Button = ({
  type = "button",
  variant = "primary",
  id,
  name,
  disabled = false,
  children,
}: IButton) => {
  return (
    <button
      type={type}
      id={id}
      name={name}
      disabled={disabled}
      className={[
        disabled && "opacity-50 active:scale-100 cursor-not-allowed",
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
