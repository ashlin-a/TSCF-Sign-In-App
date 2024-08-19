export function FormSelect({ text, options, required, onChange }) {
    return (
        <>
            <p className="font-semibold text-content-1 mt-6">{text}</p>
            <select required={required} onChange={onChange} className="form-select my-2 w-full appearance-none transition-all rounded-md border-none bg-content-1/10 text-content-1 accent-primary focus:bg-bkg focus:ring-2 focus:ring-primary focus:ring-offset-1">
                <option defaultValue={true} disabled>
                    Please select an option
                </option>
                {options.map((option) => (
                    <option key={option.key} value={option.key}>
                        {option.value}
                    </option>
                ))}
            </select>
        </>
    );
}
