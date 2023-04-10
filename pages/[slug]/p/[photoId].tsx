import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import getResults from '@/utils/cachedImages'
import getBase64ImageUrl from '@/utils/generateBlurPlaceholder'
import fetchSlugs from '@/utils/fetchSlugs'
import type { ImageProps } from '@/utils/types'
import client from 'libs/contentful'
import { getHashString } from '@/utils/getHashString'

interface PhotoIdProps {
  currentPhoto: ImageProps;
}

const PhotoId: NextPage<PhotoIdProps> = ({ currentPhoto }) => {
  const router = useRouter();

  const { photoId, slug } = router.query as { photoId: string, slug: string };
  
  let index = Number(photoId);

  if (currentPhoto == undefined) {
    return <div>Photo not found.</div>;
  }
  
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
  await avoidRateLimit()
  const entry: any = await client.getEntry('5LfwKllpyXoFuxsbyBaYvC');
  const projects = entry.fields.projects;


  const totalPaths = projects.reduce((paths, project) => {
    const numAssets = project.fields.assets.length;
    for (let i = 0; i < numAssets; i++) {
      const public_id = project.fields.assets[i].public_id;
      const photoId = getHashString(public_id).toString(); // Convert photoId to a string
      paths = paths.concat({ params: { slug: project.sys.id, photoId } });
    }
    return paths;
  }, []);

  return {
    paths: totalPaths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  await avoidRateLimit()
  const { params } = context;
  const { slug, photoId } = params;
  const { results: images } = await getResults({ slug });

  const currentPhoto = images.find((img) => img.id == photoId)
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  };
}



export function avoidRateLimit(delay = 4000) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
