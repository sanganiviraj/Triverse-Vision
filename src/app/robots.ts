import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://triversevision.com'; // Replace with actual domain when deployed

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example of path to disallow
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
