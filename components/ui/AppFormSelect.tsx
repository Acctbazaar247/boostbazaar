import { Select } from "antd";
import { Control, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string | any;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string | any;
  required?: boolean;
  className?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  listHeight?: number;
  control: Control<any>;
};

const AppFormSelect = ({
  name,
  size = "large",
  control,
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  required,
  handleChange,
  className,
  listHeight
}: SelectFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={
        required
          ? {
              required: `${name} field is required`
            }
          : undefined
      }
      defaultValue={defaultValue}
      render={({ field: { value: renderValue, onChange }, fieldState }) => (
        <div className="w-full">
          {label && (
            <label
              className="text-lg font-light break-words  pb-2 text-dark-grey"
              htmlFor={name}
            >
              {label}
            </label>
          )}
          <Select
            onChange={handleChange ? handleChange : onChange}
            size={size}
            listHeight={listHeight}
            popupClassName="capitalize"
            className={`${className ? className : ""}  `}
            options={options}
            value={value ? value : renderValue}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
          {fieldState.error && (
            <p className="text-sm text-red font-normal">
              {fieldState.error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AppFormSelect;
