export function FormDateTimeBox({ text, onChange, readOnly, value }) {
  return (
    <div>
      <p className="font-semibold">{text}</p>
      <input
        onChange={onChange} readOnly={readOnly} value={value}
        className="my-2 form-input transition-all w-full appearance-none rounded-md focus:ring-offset-0 border-none bg-content-1/10 text-content-1 accent-primary focus:bg-bkg focus:ring-2 focus:ring-primary"
        type='datetime-local' 
      />
    </div>
  );
}
