import Container from '@/components/container'
import Navbar from '@/components/Navbar'
import Project from '@/components/organisms/Project'
import client from 'libs/contentful'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {  Entry } from 'contentful';
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'

interface Project {
  fields: any;
  sys: any;
}

interface MyEntryFields {
  heading: string;
  description: string;
  projects: Project[];
}


interface MyEntry extends Entry<MyEntryFields>{};

interface portfolioPageProps {
  portfolioPage: MyEntryFields,
  entry: MyEntry
}


const Home: NextPage = ({ portfolioPage,entry }: portfolioPageProps) => {
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main>
      <Container>
        <Heading>{portfolioPage?.heading}</Heading>
        <Text className='my-10' asChild><p> {portfolioPage?.description}</p></Text>
        <div className="grid grid-col-1 md:grid-cols-3 gap-4">
        {
          portfolioPage.projects.length > 0 && portfolioPage.projects.map((project: any, index) => (
              <Project key={index} title={project.title} description={project.smallDescription} name={project.id}/>
          ))
        }
        </div>
        </Container>
      </main>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const entry: MyEntry = await client.getEntry('5LfwKllpyXoFuxsbyBaYvC');

  const portfolioPage = {
    heading: entry.fields.heading,
    description: entry.fields.description,
    projects: entry.fields.projects.map(project => {
      return {
        id: project.sys.id,
        title: project.fields.title,
        smallDescription: project.fields.smallDescription,
        fullDescription: project.fields.fullDescription,
        assets: project.fields.assets.map(project => {
          return {
            created_at: project.created_at,
            format:project.format,
            height:project.height,
            width:project.width,
            public_id:project.public_id,
          }
        })
      };
    }),
  };

  return {
    props: {
      portfolioPage: portfolioPage,
      entry: entry,
    },
  }
}

