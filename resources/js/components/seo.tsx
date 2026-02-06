import { Head, usePage } from '@inertiajs/react';

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
    image = "/images/Jenkins_logo_with_text_color_white.png",
    url,
    type = "website",
    schema
}: SEOProps & { schema?: string | object }) {
    const { props, url: pageUrl } = usePage<any>();
    const { appUrl } = props;
    const effectiveUrl = url || `${appUrl}${pageUrl}`;

    const siteName = "Jenkins Motorsports";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={effectiveUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={effectiveUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="canonical" href={effectiveUrl} />

            {/* JSON-LD Schema */}
            {schema && (
                <script type="application/ld+json">
                    {typeof schema === 'string' ? schema : JSON.stringify(schema)}
                </script>
            )}
        </Head>
    );
}
