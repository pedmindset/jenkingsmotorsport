import { Head } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

export default function SEO({  
    title,
    description = "Jenkins Motorsports - The gold standard of British Truck Racing. 1,200 BHP titans, championship history, and the next generation of motorsport legacy.",
    image = "/storage/images/Jenkins_logo_with_text_color_white.png",
    url = "https://jenkinsmotorsport.test",  
    type = "website"
}: SEOProps) {
    const siteName = "Jenkins Motorsports";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />  
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="canonical" href={url} />
        </Head>
    );
}
