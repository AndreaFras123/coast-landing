// components/Breadcrumbs.tsx - Navigation & SEO with Schema.org structured data

import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build the full breadcrumb path including Home and Universities
  const fullPath = [
    { name: "Home", href: "https://coast.academy" },
    { name: "Universities", href: "/university" },
    ...items,
  ];

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullPath.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") 
        ? item.href 
        : `https://coast.academy${item.href}`,
    })),
  };

  return (
    <>
      {/* Inject JSON-LD for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual breadcrumb navigation */}
      <nav aria-label="Breadcrumb">
        <ol style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '1rem',
          color: '#666',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {fullPath.map((item, index) => (
            <li key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && (
                <svg
                  style={{ width: '20px', height: '20px', margin: '0 12px', color: '#ccc' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {index === fullPath.length - 1 ? (
                <span style={{ color: '#f5a623', fontWeight: 500 }}>{item.name}</span>
              ) : item.href.startsWith("http") ? (
                <a
                  href={item.href}
                  style={{ color: '#666', textDecoration: 'none' }}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.href}
                  style={{ color: '#666', textDecoration: 'none' }}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
