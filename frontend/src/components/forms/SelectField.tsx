import Select, { type SingleValue } from 'react-select';
import { cn } from '../../utils/util.ts';
import type { SelectFieldOption } from '../../types/formTypes.ts';

interface SelectFieldProps {
    name: string;
    options: SelectFieldOption[];
    value: SelectFieldOption | null;
    label?: string;
    onChange: (option: SingleValue<SelectFieldOption>) => void;
    displayInline?: boolean;
    isClearable?: boolean;
    error: string;
}

const SelectField = ({
    name,
    options,
    value,
    label,
    onChange,
    displayInline,
    isClearable = false,
    error,
}: SelectFieldProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <div
                className={cn(
                    'flex flex-col gap-1',
                    displayInline && 'flex-row items-center gap-2',
                )}
            >
                {label && <label htmlFor={name}>{label}</label>}
                <Select
                    inputId={name}
                    name={name}
                    options={options}
                    value={value}
                    onChange={onChange}
                    className="w-full"
                    isClearable={isClearable}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                                ? '#0069a8'
                                : '#d4d4d4',
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
            <span className="text-sm text-red-800">{error}</span>
        </div>
    );
};

export default SelectField;
