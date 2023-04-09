import { ReactNode } from "react";
import Bridge from "../Icons/Bridge";
import Logo from "../Icons/Logo";

export interface ProjectProps {
    title: string;
    description: string;
    size?: 'sm' | 'md' | 'lg';
    children?: ReactNode;
    asChild?: boolean;
    className?:string;
    name: string;
}

export default function Project({size = 'md', children, asChild, className, title, description, name}: ProjectProps){
    return (
        <div className="relative mb-5 flex h-[300px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-black/10 px-6 pb-16 pt-64 text-center text-gray-800 shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
        <div className="inset-0 flex items-center justify-center opacity-20 ">
          {/* <span className="absolute left-0 right-0 bottom-0 h-[300px] bg-gradient-to-b from-black/0 via-black to-black"></span> */}
        </div>
        <h1 className="text-base font-bold uppercase tracking-widest">
            {title}
        </h1>
        <p className="max-w-[40ch] text-gray-800/75 sm:max-w-[32ch]">
            {description}
        </p>
        <a
          className="pointer z-10 mt-1 rounded-lg border border-white bg-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-400
          /10"
          href={`/projects/${name}`} 
        >
          See more
        </a>
      </div>
    )
}