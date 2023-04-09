import { Text } from "@/components/atoms/Text";
import Container from "@/components/container";
import Logo from "@/components/Icons/Logo";
import Contact from "@/components/templates/contact";
import client from "libs/contentful";
import {  Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";

interface ImageFields {
    title: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  }
  
export interface ContactFields {
heading: string;
description: string;
}

interface AboutPageFields {
heading: string;
description: string;
image: {
    fields: ImageFields;
};
contact: {
    fields: ContactFields;
};
}
  
  
interface MyEntry extends Entry<AboutPageFields>{};
  
type AboutPageData = {
heading: string;
description: any;
updated_at: string;
image: {
    alt: string;
    src: string;
    width: number;
    height: number;
};
contact: {
    heading:string,
    description:string
}
};

interface aboutPageProps {
    about: AboutPageData,
    entry: MyEntry
}


  
export default function About({ about, entry }: aboutPageProps) {
  return (
    <>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-black">
          {about.heading}
        </h1>
        <div className="text-center">
            {documentToReactComponents(about.description)}
        </div>
        <div className="rounded-md aspect-square odd:translate-y-6 odd:md:translate-y-12 mb-6 md:max-w-md md:mx-auto">
            <Image
                src={`https:${about.image.src}`}
                alt={about.image.alt}
                width={about.image.width}
                height={about.image.height}
                layout="intrinsic"
                objectFit="cover"
                objectPosition="center"
            />
            </div>

        <div className="mx-auto prose text-center dark:prose-invert mt-14 leading-loose">
          <small className="text-gray-500"><em>Updated {about.updated_at}</em></small>
        </div>
      </Container>
    <Contact contacts={about.contact} siteconfig={''}/>
    </>

  );
}


export async function getStaticProps() {
    const entry: MyEntry = await client.getEntry('1nkMIk8qurspwoWVOfunJh');
    const aboutPage = {
      heading: entry.fields.heading,
      description: entry.fields.description,
      updated_at: format(
        new Date(entry.sys.updatedAt,),
        'd MMM yyyy',
      ),
      image: {
        alt:entry.fields.image.fields.title,
        src: entry.fields.image.fields.file.url,
        width:entry.fields.image.fields.file.details.image.width,
        height: entry.fields.image.fields.file.details.image.height
      },
      contact: {
        heading:entry.fields.contact?.fields?.heading,
        description: entry.fields.contact?.fields?.description,
      }
    };
  
    return {
      props: {
        about: aboutPage,
        entry: entry,
      },
    }
  }
  
  