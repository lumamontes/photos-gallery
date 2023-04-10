import client from 'libs/contentful';
import { getHashString } from './getHashString';

let cachedResults
let cacheSlug

export default async function getResults({slug}) {

  if (!cachedResults || cacheSlug!== slug) {
    const entry: any = await client.getEntry(slug);

    const project_images = {
      results: entry.fields.assets.map(asset => {
        return {
          height: asset.height,
          width: asset.width,
          public_id: asset.public_id,
          format: asset.format,
          slug: slug,
          id: getHashString(asset.public_id),
        }
      })}
    cacheSlug = slug
    cachedResults = project_images
  }

  return cachedResults
}


