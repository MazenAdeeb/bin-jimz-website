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
    logo: `${url}/favicon.svg`,
    slogan: "Building the future. Securing what matters.",
    description:
      "Engineering, contracting and cybersecurity solutions delivered with speed, precision and uncompromised quality.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nasr City St.",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "m.mostafa@binjimz.com",
        telephone: "+20-10-10429021",
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
