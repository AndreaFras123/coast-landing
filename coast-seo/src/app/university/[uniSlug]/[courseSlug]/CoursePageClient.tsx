// app/university/[uniSlug]/[courseSlug]/CoursePageClient.tsx - Client Component

"use client";

import { useState } from "react";
import Link from "next/link";
import { getCourseBySlug } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";

interface CoursePageClientProps {
  uniSlug: string;
  courseSlug: string;
}

export default function CoursePageClient({ uniSlug, courseSlug }: CoursePageClientProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const data = getCourseBySlug(uniSlug, courseSlug);

  if (!data) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '1.5rem' }}>Course Not Found</h1>
          <Link href="/university" style={{ color: '#f5a623', fontSize: '1.25rem' }}>
            Browse Universities
          </Link>
        </div>
      </main>
    );
  }

  const { university, course } = data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Email captured:", email, "for course:", course.title);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

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
        maxWidth: '900px', 
        padding: '80px 32px' 
      }}>
        
        {/* Breadcrumbs */}
        <div style={{ textAlign: 'center' }}>
          <Breadcrumbs
            items={[
              { name: university.name, href: `/university/${university.slug}` },
              { name: `${course.title} Past Papers`, href: `/university/${university.slug}/${course.slug}` },
            ]}
          />
        </div>

        {/* Course Header - SEO Optimized H1 */}
        <div style={{ 
          marginTop: '80px', 
          marginBottom: '100px', 
          textAlign: 'center' 
        }}>
          <p style={{ 
            color: '#666', 
            marginBottom: '24px', 
            fontSize: '1.25rem' 
          }}>
            {university.name}
          </p>
          {/* CRUCIAL: H1 with "Past Papers & Solutions" for SEO */}
          <h1 style={{ 
            fontSize: '2.75rem', 
            fontWeight: 'bold', 
            color: '#1a1a2e',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.2
          }}>
            {course.title} Past Papers & Solutions
          </h1>
        </div>

        {/* Email Capture Card */}
        {!course.hasPaper && !isSuccess && (
          <div style={{ 
            marginBottom: '120px', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <div style={{ 
              backgroundColor: '#fcfcfc', 
              border: '1px solid #e0e0e0', 
              borderRadius: '24px', 
              padding: '56px', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              maxWidth: '700px', 
              width: '100%', 
              textAlign: 'center' 
            }}>
              
              {/* Header text */}
              <p style={{ 
                color: '#707070', 
                fontSize: '1.1rem', 
                fontWeight: 'bold', 
                marginBottom: '40px',
                fontFamily: 'var(--font-heading)'
              }}>
                Coming soon - join the waitlist for exclusive beta benefits & rewards
              </p>

              {/* Email Form */}
              <form 
                onSubmit={handleSubmit} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: '#fff', 
                  borderRadius: '50px', 
                  border: '1px solid #ddd', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '8px' 
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email ..."
                  required
                  style={{ 
                    flex: 1, 
                    fontSize: '1.1rem', 
                    color: '#1a1a2e', 
                    outline: 'none', 
                    border: 'none', 
                    backgroundColor: 'transparent', 
                    paddingLeft: '24px',
                    fontFamily: 'var(--font-body)'
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ 
                    padding: '20px 40px', 
                    backgroundColor: '#f5a623', 
                    color: '#fff', 
                    fontWeight: 'bold', 
                    borderRadius: '50px', 
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.5 : 1,
                    fontSize: '1.25rem',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(245, 166, 35, 0.3)',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {isSubmitting ? "Saving..." : "Save Me"}
                </button>
              </form>

              {/* Trust text */}
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#999', 
                marginTop: '32px' 
              }}>
                We&apos;ll notify you when solutions are ready. No spam, ever.
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div style={{ 
            marginBottom: '120px', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <div style={{ 
              backgroundColor: '#f0fdf4', 
              border: '1px solid #bbf7d0', 
              borderRadius: '24px', 
              padding: '64px', 
              maxWidth: '700px', 
              width: '100%', 
              textAlign: 'center' 
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#fff', 
                border: '1px solid #bbf7d0', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 40px' 
              }}>
                <svg style={{ width: '40px', height: '40px', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '600', 
                color: '#1a1a2e', 
                marginBottom: '24px',
                fontFamily: 'var(--font-heading)'
              }}>
                You&apos;re on the list!
              </h2>
              <p style={{ color: '#666', fontSize: '1.25rem' }}>
                We&apos;ll notify <span style={{ fontWeight: '500', color: '#1a1a2e' }}>{email}</span> when solutions are ready.
              </p>
            </div>
          </div>
        )}

        {/* About This Course Section - SEO rich content */}
        <section style={{ 
          marginBottom: '100px', 
          textAlign: 'center' 
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            color: '#1a1a2e', 
            marginBottom: '40px',
            fontFamily: 'var(--font-heading)'
          }}>
            About {course.title} Past Papers
          </h2>
          <p style={{ 
            color: '#555', 
            fontSize: '1.25rem', 
            lineHeight: 1.8, 
            maxWidth: '700px', 
            margin: '0 auto' 
          }}>
            {course.description}
          </p>
        </section>

        {/* Topics Covered Section - SEO rich content */}
        <section style={{ 
          marginBottom: '100px', 
          textAlign: 'center' 
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            color: '#1a1a2e', 
            marginBottom: '56px',
            fontFamily: 'var(--font-heading)'
          }}>
            Exam Topics Covered
          </h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {course.topics.map((topic, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                color: '#555', 
                fontSize: '1.1rem',
                backgroundColor: '#f9f9f9',
                padding: '16px 20px',
                borderRadius: '12px'
              }}>
                <svg style={{ width: '24px', height: '24px', color: '#f5a623', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {topic}
              </div>
            ))}
          </div>
        </section>

        {/* What You'll Get Section */}
        <section style={{ 
          marginBottom: '100px', 
          textAlign: 'center' 
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            color: '#1a1a2e', 
            marginBottom: '56px',
            fontFamily: 'var(--font-heading)'
          }}>
            What You&apos;ll Get
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '32px' 
          }}>
            {[
              `${course.title} past exam papers from recent years`,
              "Step-by-step worked solutions with OCR verification",
              "Key concepts and exam tips for high scores",
              "AI-powered explanations tailored to your questions"
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px', 
                color: '#555', 
                fontSize: '1.25rem' 
              }}>
                <svg style={{ width: '28px', height: '28px', color: '#f5a623', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <div style={{ 
          marginTop: '64px', 
          textAlign: 'center' 
        }}>
          <Link
            href={`/university/${university.slug}`}
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
            Back to all {university.name} courses
          </Link>
        </div>
      </div>
    </main>
  );
}
