export function FormDateBox({ text, onChange, readOnly, value, name }) {
    return (
        <div>
            <p className="font-semibold text-content-1">{text}</p>
            <input
                onChange={onChange}
                readOnly={readOnly}
                value={value}
                name={name}
                className="form-input my-2 transition-all w-full appearance-none rounded-md border-none bg-content-1/10 uppercase text-content-1 accent-primary focus:bg-bkg focus:ring-2 focus:ring-primary focus:ring-offset-0"
                type="date"
            />
        </div>
    );
}
