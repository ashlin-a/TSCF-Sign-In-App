export function FormPhoneBox({ text, required, onChange, readOnly, value,}) {
  return (
    <div>
      <p className="font-semibold text-content-1">{text}</p>
      <input
        onChange={onChange} required={required} readOnly={readOnly} value={value} pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='123-456-6789' title='123-456-6789'
        className="my-2 form-input w-full transition-all appearance-none rounded-md focus:ring-offset-0 border-none bg-content-1/10 text-content-1 accent-primary focus:bg-bkg focus:ring-2 focus:ring-primary"
        type='tel'
      />
    </div>
  );
}
