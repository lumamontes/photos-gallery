import React, { useEffect, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Heading } from "./atoms/Heading";
import useSWR from "swr";
import { getSocialMediaLinks } from "@/utils/getSocialMediaLinks";


export default function Navbar(props) {
  const { data: socialMediaLinks, error } = useSWR("socialMediaLinks", getSocialMediaLinks);

  const leftmenu = [
    {
      label: "Portfolio",
      href: "/",
      external: false
    },
    {
      label: "About",
      href: "/about",
      external: false

    },
  ];
  const rightmenu = !socialMediaLinks ? [] : socialMediaLinks;


  const mobilemenu = [...leftmenu, ...rightmenu];
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {leftmenu.map((item, index) => (
                    <Link href={item.href} key={index} legacyBehavior>
                      <a className={`px-5 py-2 text-sm font-medium  dark:text-gray-400 hover:text-blue-500 ${currentRoute === item.href 
                    ? "text-blue-500" 
                    : "text-gray-500"}`} >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/" legacyBehavior>
                    <a className="w-38 dark:hidden flex items-center">
                          <Heading> Katelyn Nee </Heading>
                    </a>
                  </Link>
                  <Link href="/" legacyBehavior>
                    <a className="hidden w-38 dark:block">
                          Stablo
                    </a>
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                        {/* <SliceZone
                          slices={links?.results[0].data.slices}
                          components={
                            {"nav_item_link":  RightMenuLinkSlice}
                          }
                        ></SliceZone> */}
                        {rightmenu.map((item, index) => (
                    <Link href={item.href} key={index} legacyBehavior>
                      <a className={`px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 ${currentRoute === item.href 
                    ? "text-blue-500" 
                    : "text-gray-500"}`} >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Link href={item.href} key={index} legacyBehavior>
                      <a
                        className={`px-5 py-2 text-sm font-medium dark:text-gray-400 hover:text-blue-500 ${currentRoute === item.href 
                          ? "text-blue-500" 
                          : "text-gray-600"}`}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}