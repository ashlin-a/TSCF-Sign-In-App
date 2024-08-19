import { twMerge } from "tailwind-merge"

export function Button({ label, onClick, type, className }) {
  return (
    <button
      onClick={onClick} type={type}
      className={twMerge("my-4 w-full rounded-lg transition-all bg-primary p-3 text-base font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50", className)}
    >
      {label}
    </button>
  );
}
