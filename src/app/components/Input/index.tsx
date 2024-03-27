import { useFormState } from "react-hook-form";

export interface IInput {
  id: string;
  type?: "number" | "text" | "textarea";
  label?: string | JSX.Element;
  name?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  register?: any;
  schema?: any;
  control?: any;
  className?: string;
}
const Input = ({
  type = "text",
  id,
  label,
  name,
  placeholder,
  control,
  schema = {},
  register,
  minLength,
  maxLength,
  className,
}: IInput) => {
  const { errors } = useFormState({ control });
  const classNameBase = "py-2 px-3 rounded-sm";
  return (
    <div className={["flex flex-col gap-1", className].join(" ").trim()}>
      {label && (
        <label htmlFor={id} className="text-label font-bold">
          {label}
        </label>
      )}
      {(type === "number" && (
        <input
          id={id}
          type={type}
          name={name}
          className={classNameBase}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          {...register(name, schema)}
        />
      )) ||
        null}
      {(type === "text" && (
        <input
          id={id}
          type={type}
          name={name}
          className={classNameBase}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          {...register(name, schema)}
        />
      )) ||
        null}
      {(type === "textarea" && (
        <textarea
          id={id}
          name={name}
          className={classNameBase}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          {...register(name, schema)}
        />
      )) ||
        null}

      {errors && errors[name!] && (
        <label className="text-label bg-red-100 p-1 text-red-500">
          {errors[name!]?.message as string}
        </label>
      )}
    </div>
  );
};

export default Input;
