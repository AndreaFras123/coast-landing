// app/university/page.tsx - Universities Listing

import { Metadata } from "next";
import Link from "next/link";
import { universities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Universities | Coast - Past Papers & AI Solutions",
  description:
    "Browse universities with past papers and AI-powered exam solutions. Find your university and start studying smarter.",
};

export default function UniversitiesPage() {
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
        
        {/* Simple breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '80px', textAlign: 'center' }}>
          <ol style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px', 
            fontSize: '1rem', 
            color: '#666',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li>
              <a href="https://coast.academy" style={{ color: '#666', textDecoration: 'none' }}>
                Home
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '20px', height: '20px', margin: '0 12px', color: '#ccc' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span style={{ color: '#f5a623', fontWeight: 500 }}>Universities</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '100px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            color: '#1a1a2e', 
            marginBottom: '40px',
            fontFamily: 'var(--font-heading)'
          }}>
            Universities
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#666', 
            lineHeight: 1.6, 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            Select your university to browse available courses and past papers
          </p>
        </div>

        {/* University Grid - centered */}
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '48px',
            maxWidth: '1100px',
            width: '100%'
          }}>
            {universities.map((uni) => (
              <Link
                key={uni.slug}
                href={`/university/${uni.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ 
                  backgroundColor: '#fcfcfc', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '24px', 
                  padding: '56px 40px', 
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  {/* University Icon */}
                  <div style={{ 
                    width: '96px', 
                    height: '96px', 
                    backgroundColor: 'rgba(245, 166, 35, 0.1)', 
                    border: '1px solid rgba(245, 166, 35, 0.3)', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '40px',
                    margin: '0 auto 40px'
                  }}>
                    <svg style={{ width: '48px', height: '48px', color: '#f5a623' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>

                  {/* University Name */}
                  <h2 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '600', 
                    color: '#1a1a2e', 
                    marginBottom: '24px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {uni.name}
                  </h2>

                  {/* Course Count */}
                  <p style={{ color: '#666', fontSize: '1.25rem' }}>
                    {uni.courses.length} courses available
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <p style={{ color: '#999', fontSize: '1.25rem' }}>
            More universities coming soon.{" "}
            <a href="https://coast.academy/#join" style={{ color: '#f5a623', textDecoration: 'none' }}>
              Request your university
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
