export function InputBox({
    label,
    placeholder,
    autoFocus,
    type,
    onChange,
    required,
    className,
    spellCheck
}) {
    return (
        <div className={`h-16 w-full ${className}`}>
            <p className="pt-2">{label}</p>
            <input
                placeholder={placeholder}
                autoFocus={autoFocus}
                type={type}
                onChange={onChange}
                required={required} spellCheck={spellCheck}
                className="w-full border-b border-solid border-primary bg-transparent p-2 px-3 hover:border-b-2 focus:border-b-2 focus:outline-none"
            ></input>
            {/* <div className="text-warning text-right">Please enter the correct {label.toLowerCase()}</div> */}
        </div>
    );
}
