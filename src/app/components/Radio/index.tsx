import { useFormState } from "react-hook-form";

export interface IRadio {
  label?: string | JSX.Element;
  name?: string;
  values: { name: string; label: string; value: string }[];
  register?: any;
  schema?: any;
  control?: any;
  className?: string;
}
const Radio = ({
  label,
  name,
  values,
  register,
  schema,
  control,
  className,
}: IRadio) => {
  const { errors } = useFormState({ control });
  return (
    <div className={["flex flex-col gap-1", className].join(" ").trim()}>
      {label && (
        <label
          htmlFor={values[0].name}
          className={[
            "text-label font-bold",
            (errors && errors[name!] && "text-red-500") || "",
          ]
            .join(" ")
            .trim()}
        >
          {label}
        </label>
      )}
      <div className="flex flex-row gap-4 py-2">
        {values?.map(({ name: optionName, label: optionLabel }) => {
          return (
            <div key={optionName} className="flex flex-row gap-1 align-middle">
              <input
                type="radio"
                id={optionName}
                name={name}
                value={optionName}
                {...register(name, schema)}
              />
              {optionLabel && (
                <label htmlFor={optionName} className="text-base">
                  {optionLabel}
                </label>
              )}
              {errors && errors[name!]?.message && (
                <label className="text-label bg-red-200 p-1 text-red-500">
                  {errors[name!]?.message as string}
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
