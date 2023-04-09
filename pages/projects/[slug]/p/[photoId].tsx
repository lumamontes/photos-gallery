import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import getResults from '@/utils/cachedImages'
import cloudinary from '@/utils/cloudinary'
import getBase64ImageUrl from '@/utils/generateBlurPlaceholder'
import type { ImageProps } from '@/utils/types'
import client from 'libs/contentful'
import fetchSlugs from '@/utils/fetchSlugs'
import fetchPhotoIds from '@/utils/fetchPhotoIds'

const Home: NextPage = ({ currentPhoto,entry, images }: { currentPhoto: ImageProps, entry:any, images:any }) => {
  const router = useRouter()
  const { photoId, slug } = router.query
  let index = Number(photoId)
  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto?.public_id}.${currentPhoto.format}`

  return (
    <>
      <Head>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <div className="relative mx-auto max-w-[1960px] h-full p-4">
        <Carousel currentPhoto={currentPhoto} index={index} slug={slug} images={images}/>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const images = await getResults({slug})
  const entry: any = await client.getEntry(`${slug}`);

  let reducedResults: ImageProps[] = []
  let i = 0
  for (let result of images.results) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return {
    props: {
      currentPhoto: currentPhoto,
      images: images.results
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Replace "fetchSlugs" with your own function to fetch slugs
  const slugs = await fetchSlugs();

  const paths = [];
  // Loop through the array of objects and generate paths
  slugs.projects.forEach((slug) => {
    for (let i = 0; i < slug.count_assets; i++) {
      paths.push({ params: { slug: slug.id, photoId: i.toString() } });
    }
  });

  return {
    paths: paths,
    fallback: false, // Or true or 'blocking' depending on your needs
  };
};