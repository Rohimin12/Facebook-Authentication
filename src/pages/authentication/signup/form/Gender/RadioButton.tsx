interface radioButtonProps {
  field: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
    name: string;
    ref: React.Ref<any>;
  };
  value: string;
  isError: boolean;
}

const RadioButton: React.FC<radioButtonProps> = ({ value, field, isError }) => {
  return (
    <label
      htmlFor={value}
      className={`flex p-3 w-full bg-white border rounded-md text-sm cursor-pointer ${
        isError ? "border-red-500" : "border-gray-200"
      }`}
      title={value}>
      <span className="text-sm text-gray-500 capitalize">{value}</span>
      <input
        type="radio"
        name={field.name}
        value={value}
        checked={field.value === value}
        onChange={(e) => {
          field.onChange(e.target.value); // Manually call the onChange handler
        }}
        onBlur={field.onBlur}
        className="shrink-0 ml-auto mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none"
        id={value}
      />
    </label>
  );
};

export default RadioButton;
