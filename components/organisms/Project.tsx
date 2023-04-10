import Link from "next/link";
import { ReactNode } from "react";

export interface ProjectProps {
    title: string;
    description: string;
    size?: 'sm' | 'md' | 'lg';
    children?: ReactNode;
    asChild?: boolean;
    className?:string;
    name: string;
    slug?:string
}

export default function Project({size = 'md', children, asChild, className, title, description, name, slug = ''}: ProjectProps){
    return (
        <> 
        <Link
          className="py-10 group flex flex-col justify-between rounded-sm bg-white p-4 shadow-xl transition-shadow hover:shadow-lg sm:p-6 lg:p-8"
          href={`/${name}`}
          as={`/${encodeURIComponent(name)}`} 
        >
          <div>
            <h3 className="text-lg font-bold sm:text-xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{title}</h3>

            <div className="mt-4 border-t-2 border-gray-100 pt-4">
              <p className="text-sm font-medium  text-gray-500">{description}</p>
            </div>
          </div>

          <div
            className="mt-8 inline-flex items-center gap-2 text-slate-700 sm:mt-12 lg:mt-16"
          >
            <p className="font-medium sm:text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Explore</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition group-hover:translate-x-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Link>
      </>
    )
}
