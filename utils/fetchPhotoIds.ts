import client from 'libs/contentful';

let cachedResults

export default async function fetchPhotoIds({slug}) {
    const entry: any = await client.getEntry(slug);
    const project_images = {
        results: entry.fields.assets.map(asset => {
          return {
            public_id: asset.public_id,
          }
        })}

      let photoIds: {id: number}[] = []
    
      let i = 0
      for (let result of project_images.results) {
        photoIds.push({
          id: i,
        })
        i++
      }
  

  return photoIds
}


