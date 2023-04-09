import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import getResults from '@/utils/cachedImages'
import getBase64ImageUrl from '@/utils/generateBlurPlaceholder'
import fetchSlugs from '@/utils/fetchSlugs'
import type { ImageProps } from '@/utils/types'

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

export const getStaticPaths: GetStaticPaths = async () => {
  // Replace "fetchSlugs" with your own function to fetch slugs
  // const {projects} = await fetchSlugs();
  // const fullPaths = projects.flatMap(project => {
  //   return project.assets.map((photoId,index) => ({
  //     params: {
  //       slug: project.id,
  //       photoId: index.toString()
  //     }
  //   }))
  // })
  
  return {
    paths: [],
    fallback: 'blocking', // Or true or 'blocking' depending on your needs
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug, photoId } = params;

  // Use destructuring and rename properties for better readability
  const { results: images } = await getResults({ slug });

  // Use Array.map instead of for loop to simplify code
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
