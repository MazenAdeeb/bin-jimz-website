type Props = {
  url: string;
};

export function OrganizationJsonLd({ url }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bin Jimz",
    legalName: "Bin Jimz Company",
    url,
    logo: `${url}/brand/bin-jimz-mark.png`,
    slogan: "Building the future. Securing what matters.",
    description:
      "Engineering, contracting and cybersecurity solutions delivered with speed, precision and uncompromised quality.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Riviera St., Bldg 49, 1st Floor, Apt 5",
      addressLocality: "Sheikh Zayed City",
      addressRegion: "Giza",
      addressCountry: "EG",
    },
    email: "Info@binjimz.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "Info@binjimz.com",
        telephone: "+201000215557",
        areaServed: "EG",
        availableLanguage: ["en", "ar"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+971542000526",
        areaServed: "AE",
        availableLanguage: ["en", "ar"],
      },
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd({ url }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bin Jimz",
    url,
    inLanguage: ["en", "ar"],
  };
  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
