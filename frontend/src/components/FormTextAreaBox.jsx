export function FormTextAreaBox({ text, type, onChange, rows }) {
  return (
    <div>
      <p className="font-semibold">{text}</p>
      <textarea
        onChange={onChange} rows={rows}
        className="my-2 form-textarea w-full transition-all appearance-none rounded-md focus:ring-offset-0 border-none bg-content-1/10 text-content-1 accent-primary focus:bg-bkg focus:ring-2 focus:ring-primary"
        type={type}
      />
    </div>
  );
}
