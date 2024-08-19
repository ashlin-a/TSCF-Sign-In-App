export function FormCheckBox({
    text,
    options,
    onChange,
    className,
    allOptionStyles,
    required,
}) {
    return (
        <div className={className}>
            <p className="mt-2 font-semibold text-content-1">{text}</p>
            <div className={allOptionStyles}>
                {options.map((option) => (
                    <div key={option.key} className="flex items-center">
                        <input
                            type="checkbox"
                            id={option.key}
                            name={option.key}
                            value={option.value}
                            onChange={onChange}
                            required={required}
                            className="form-checkbox transition-all mr-2 appearance-none rounded border-none bg-content-1/10 text-primary accent-primary focus:bg-bkg focus:ring-1 focus:ring-primary focus:ring-offset-0"
                        ></input>
                        <label className="text-content-1" htmlFor={option.key}>
                            {option.value}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
