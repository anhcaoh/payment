export interface IRadioSelect {
  id: string;
  label?: string | JSX.Element;
  name?: string;
  values: { name: string; label: string; value: string }[];
}
const Radio = ({ id, label, name, values }: IRadioSelect) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={values[0].name} className="text-label font-bold">
          {label}
        </label>
      )}
      <div className="flex flex-row gap-4">
        {values?.map(({ name: optionName, label: optionLabel, value }) => {
          return (
            <div key={optionName} className="flex flex-row gap-1 align-middle">
              <input type="radio" id={optionName} name={name} value={value} />
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
