// components/layout/SEOHead.js
import Head from 'next/head';

export default function SEOHead({
  title = 'CodePromix Agency — Web, SEO & Digital Marketing',
  description = 'CodePromix Agency builds stunning websites, drives organic traffic with SEO, runs effective digital marketing campaigns, and delivers premium WordPress plugins.',
  keywords = 'web development, digital marketing, SEO, WordPress plugins, CodePromix',
  robots = 'index,follow',
  ogImage = '/og-default.jpg',
  canonical,
}) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://CodePromix.in';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* OG */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={`${siteUrl}${ogImage}`} />
      <meta property="og:type"        content="website" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={`${siteUrl}${ogImage}`} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
