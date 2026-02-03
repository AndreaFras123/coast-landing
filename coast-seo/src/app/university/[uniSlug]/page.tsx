// app/university/[uniSlug]/page.tsx - The University Hub

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUniversityBySlug, universities } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: Promise<{ uniSlug: string }>;
}

// Generate static params for all universities
export async function generateStaticParams() {
  return universities.map((uni) => ({
    uniSlug: uni.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uniSlug } = await params;
  const university = getUniversityBySlug(uniSlug);

  if (!university) {
    return {
      title: "University Not Found | Coast",
    };
  }

  return {
    title: `${university.name} Past Papers | Coast`,
    description: `Access past exam papers, solutions, and study resources for ${university.name}. Prepare smarter with AI-powered learning tools.`,
    openGraph: {
      title: `${university.name} Past Papers | Coast`,
      description: `Access past exam papers and solutions for ${university.name}`,
      type: "website",
    },
  };
}

export default async function UniversityPage({ params }: PageProps) {
  const { uniSlug } = await params;
  const university = getUniversityBySlug(uniSlug);

  if (!university) {
    notFound();
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        padding: '80px 32px' 
      }}>
        
        {/* Breadcrumbs - centered */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <Breadcrumbs
            items={[{ name: university.name, href: `/university/${university.slug}` }]}
          />
        </div>

        {/* Header */}
        <div style={{ marginBottom: '100px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            color: '#1a1a2e', 
            marginBottom: '40px',
            fontFamily: 'var(--font-heading)'
          }}>
            {university.name}
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#666', 
            lineHeight: 1.6, 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            Browse {university.courses.length} courses with past papers and AI-powered solutions
          </p>
        </div>

        {/* Course Grid - centered */}
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '40px',
            maxWidth: '1100px',
            width: '100%'
          }}>
            {university.courses.map((course) => (
              <Link
                key={course.slug}
                href={`/university/${university.slug}/${course.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ 
                  backgroundColor: '#fcfcfc', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '20px', 
                  padding: '48px 40px', 
                  textAlign: 'center',
                  height: '100%',
                  minHeight: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  {/* Course Title */}
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '600', 
                    color: '#1a1a2e', 
                    marginBottom: '20px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {course.title}
                  </h2>

                  {/* Brief description */}
                  <p style={{ 
                    color: '#777', 
                    fontSize: '1rem', 
                    lineHeight: 1.5,
                    marginBottom: '24px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {course.description.split('.')[0]}.
                  </p>

                  {/* Status */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px', 
                    color: '#666' 
                  }}>
                    <svg style={{ width: '20px', height: '20px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ fontSize: '1rem' }}>Coming Soon</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to universities */}
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <Link
            href="/university"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              color: '#666', 
              fontSize: '1.25rem',
              textDecoration: 'none'
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all universities
          </Link>
        </div>
      </div>
    </main>
  );
}
