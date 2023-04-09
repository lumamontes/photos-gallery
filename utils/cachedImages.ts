import client from 'libs/contentful';
import cloudinary from './cloudinary'

let cachedResults

export default async function getResults({slug}) {
  if (!cachedResults) {
    const entry: any = await client.getEntry(slug);

    const project_images = {
      results: entry.fields.assets.map(asset => {
        return {
          height: asset.height,
          width: asset.width,
          public_id: asset.public_id,
          format: asset.format,
        }
      })}

    cachedResults = project_images
  }

  return cachedResults
}


