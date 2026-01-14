import DatePicker from 'react-datepicker';
import { cn } from '../../utils/util.ts';
import 'react-datepicker/dist/react-datepicker.css';

interface DateFieldProps {
    name: string;
    label?: string;
    startDate: Date | null;
    endDate: Date | null;
    placeholder: string;
    error?: string;
    displayInline?: boolean;
    onChange: (dates: [Date | null, Date | null]) => void;
}

const DateField = ({
    name,
    label,
    startDate,
    endDate,
    placeholder,
    error,
    displayInline,
    onChange,
}: DateFieldProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <div
                className={cn(
                    'flex flex-col gap-1',
                    displayInline && 'flex-row gap-2',
                )}
            >
                {label && (
                    <label htmlFor={name} className="pt-1.5 whitespace-nowrap">
                        {label}
                    </label>
                )}

                <div className="flex w-full flex-col gap-2">
                    <DatePicker
                        id={name}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={onChange}
                        isClearable={true}
                        minDate={new Date()}
                        placeholderText={placeholder}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        enableTabLoop={false}
                        className={cn(
                            'w-full rounded-sm border border-stone-300 p-2 text-sm transition-colors',
                            'focus:border-yellow-700 focus:outline-sky-700',
                            error && 'border-red-800',
                        )}
                        wrapperClassName="w-full"
                    />
                    {error && (
                        <span className="text-sm text-red-800">{error}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DateField;
