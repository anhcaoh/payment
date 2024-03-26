export interface IRadio {
  label?: string | JSX.Element;
  name?: string;
  values: { name: string; label: string; value: string }[];
  register?: any;
  schema?: any;
}
const Radio = ({ label, name, values, register, schema }: IRadio) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={values[0].name} className="text-label font-bold">
          {label}
        </label>
      )}
      <div className="flex flex-row gap-4">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
