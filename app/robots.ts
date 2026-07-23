import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/lp2'],
        },
        sitemap: 'https://sophiabrutos.com.br/sitemap.xml',
    }
}
