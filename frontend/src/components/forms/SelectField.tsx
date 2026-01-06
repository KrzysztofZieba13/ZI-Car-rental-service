import Select, { type SingleValue } from 'react-select';
import type { SelectFieldOption } from '../../features/car/AddCar.tsx';

interface SelectFieldProps {
    name: string;
    options: SelectFieldOption[];
    value: SelectFieldOption | null;
    label?: string;
    onChange: (option: SingleValue<SelectFieldOption>) => void;
}

const SelectField = ({
    name,
    options,
    value,
    label,
    onChange,
}: SelectFieldProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            {label && <label htmlFor={name}>{label}</label>}
            <Select
                inputId={name}
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? '#0069a8' : '#d4d4d4',
                        boxShadow: state.isFocused
                            ? `0 0 0 1px #0069a8`
                            : 'none',
                        '&:hover': {
                            borderColor: '#0069a8',
                        },
                    }),
                }}
                menuPosition="fixed"
            />
        </div>
    );
};

export default SelectField;
