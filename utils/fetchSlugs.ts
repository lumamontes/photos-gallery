import client from 'libs/contentful';

let cachedResults

export default async function fetchSlugs() {
    const entry: any = await client.getEntry('5LfwKllpyXoFuxsbyBaYvC');

    const slugs = {
      projects: entry.fields.projects.map(project => {
        return {
          id: project.sys.id,
          assets:project.fields.assets,
          count_assets: project.fields.assets.length
        };
      }),
    };
  

  return slugs
}


