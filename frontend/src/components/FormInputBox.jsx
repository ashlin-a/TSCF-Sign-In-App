import { twMerge } from 'tailwind-merge';
export function FormInputBox({
    text,
    type,
    onChange,
    readOnly,
    value,
    pattern,
    placeholder,
    inputTitle,
    name,
    inputStyles,
    required,
}) {
    return (
        <div>
            <p className="font-semibold">{text}</p>
            <input
                name={name}
                onChange={onChange}
                readOnly={readOnly}
                value={value}
                pattern={pattern}
                placeholder={placeholder}
                title={inputTitle}
                required={required}
                className={twMerge(
                    'form-input  my-2 transition-all w-full appearance-none rounded-md border-none bg-content-1/10 text-content-1 accent-primary focus:bg-bkg focus:ring-2 focus:ring-primary focus:ring-offset-0',
                    inputStyles,
                )}
                type={type}
            />
        </div>
    );
}
