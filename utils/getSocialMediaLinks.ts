import client from "libs/contentful";

export async function getSocialMediaLinks() {
  const response: any = await client.getEntry('5BpPEyg6kavK9GzRjNOyPF');
  const socialMediaLinks = response.fields.links.map((item) => ({
    label: item.fields.title,
    href: item.fields.url,
    external: true
  }));
  return socialMediaLinks;
}