export interface IInput {
  id: string;
  type?: "number" | "text" | "textarea";
  label?: string | JSX.Element;
  name?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  error?: string | JSX.Element;
  schema?: any;
  register?: any;
}
const Input = ({
  type = "text",
  id,
  label,
  name,
  placeholder,
  error,
  schema,
  register,
  minLength,
  maxLength,
}: IInput) => {
  const classNameBase = "py-2 px-3 rounded-sm shadow-sm";
  return (
    <div className="flex flex-col gap-1">
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

      {error && (
        <label className="text-label bg-red-100 p-1 text-red-500">
          {error}
        </label>
      )}
    </div>
  );
};

export default Input;
