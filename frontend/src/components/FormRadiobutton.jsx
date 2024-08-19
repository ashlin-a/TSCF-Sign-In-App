export function FormRadioButton({text, options, onChange,required, className}){
    return (
        <div className={className}>
            <p className="font-semibold mt-4 ">{text}</p>
            {options.map((option) => (
                <div key={option.value} className="flex items-center">
                    <input required={required}
                        type="radio"
                        id={option.key}
                        name={option.key}
                        value={option.value}
                        onChange={onChange}
                        className="form-radio transition-all mr-2 my-2 appearance-none rounded-full border-none bg-content-1/10 text-primary accent-primary focus:bg-bkg focus:ring-1 focus:ring-primary focus:ring-offset-1"
                    ></input>
                    <label className="" htmlFor={option.key}>
                        {option.value}
                    </label>
                </div>
            ))}
        </div>
    );
}