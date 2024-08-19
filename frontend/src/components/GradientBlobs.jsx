import { twMerge } from 'tailwind-merge';
export default function GradientBlobs({blobStyles}) {
    return (
        <>
            <div
                className={twMerge(
                    'animate-blob absolute left-20 top-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-primary opacity-70 blur-3xl filter',
                    blobStyles
                )}
            ></div>
            <div
                className={twMerge(
                    'animate-blob animation-delay-2000 absolute right-20 top-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-secondary opacity-70 blur-3xl filter',
                    blobStyles
                )}
            ></div>
            <div
                className={twMerge(
                    'animate-blob animation-delay-4000 absolute bottom-20 left-1/3 -z-20 h-[40rem] w-[40rem] rounded-full bg-tertiary opacity-70 blur-3xl filter',
                    blobStyles
                )}
            ></div>
        </>
    );
}
