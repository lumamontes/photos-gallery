import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import getResults from '@/utils/cachedImages'
import getBase64ImageUrl from '@/utils/generateBlurPlaceholder'
import fetchSlugs from '@/utils/fetchSlugs'
import type { ImageProps } from '@/utils/types'
import client from 'libs/contentful'

interface PhotoIdProps {
  currentPhoto: ImageProps;
}

const PhotoId: NextPage<PhotoIdProps> = ({ currentPhoto }) => {
  const router = useRouter();

  if (!router.query || !currentPhoto) {
    return <div>Loading...</div>;
  }

  const { photoId, slug } = router.query as { photoId: string, slug: string };
  let index = Number(photoId);

  if (currentPhoto == undefined) {
    return <div>Photo not found.</div>;
  }
  
  console.log(currentPhoto.public_id)
  const currentPhotoUrl = 'https://res.cloudinary.com/' + process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + '/image/upload/c_scale,w_2560/' + currentPhoto.public_id + '.' + currentPhoto.format;

  return (
    <>
      <Head>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <div className="relative mx-auto max-w-[1960px] h-full p-4">
        <Carousel currentPhoto={currentPhoto} index={index} slug={slug}/>
      </div>
    </>
  )
}

export default PhotoId


// export async function getStaticPaths() {
//   await avoidRateLimit()
//   const entry: any = await client.getEntry('5LfwKllpyXoFuxsbyBaYvC');

//   const fullPaths = [];

//   entry.fields.projects.forEach(project => {
//     const numAssets = project.fields.assets.length;
//     for (let i = 0; i < numAssets; i++) {
//       fullPaths.push({ params: { slug: project.sys.id, photoId: i.toString() } });
//     }
//   });

//   return {
//     paths: fullPaths,
//     fallback: true,
//   };
// }

export async function getStaticPaths() {
  const entry: any = await client.getEntry('5LfwKllpyXoFuxsbyBaYvC');

  const fullPaths = [];

  const project = entry.fields.projects[0];
  const numAssets = project.fields.assets.length;
  
  for (let i = 0; i < numAssets; i++) {
    fullPaths.push({ params: { slug: project.sys.id, photoId: i.toString() } });
  }

  const OtherPaths = [];

  const project1 = entry.fields.projects[1];
  const numAssets1 = project1.fields.assets.length;
  
  for (let i = 0; i < 6; i++) {
    OtherPaths.push({ params: { slug: project1.sys.id, photoId: i.toString() } });
  }

  const totalPaths = [...fullPaths, ...OtherPaths]

  return {
    paths: totalPaths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug, photoId } = params;

  // await avoidRateLimit()
  const { results: images } = await getResults({ slug });

  const reducedResults = images.map((result, i) => ({
    id: i,
    height: result.height,
    width: result.width,
    public_id: result.public_id,
    format: result.format,
  }));

  const currentPhoto = reducedResults.find((img) => img.id === Number(photoId));
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);
  return {
    props: {
      currentPhoto,
    },
  };
}



// export function avoidRateLimit(delay = 500) {
//   if (!process.env.IS_BUILD) {
//     return
//   }

//   return new Promise((resolve) => {
//     setTimeout(resolve, delay)
//   })
// }