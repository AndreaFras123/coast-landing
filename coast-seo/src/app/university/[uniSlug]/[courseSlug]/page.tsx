// app/university/[uniSlug]/[courseSlug]/page.tsx - The Course Page

import { Metadata } from "next";
import { getCourseBySlug, universities } from "@/lib/data";
import CoursePageClient from "./CoursePageClient";

interface PageProps {
  params: Promise<{ uniSlug: string; courseSlug: string }>;
}

// Generate static params for all courses
export async function generateStaticParams() {
  const params: { uniSlug: string; courseSlug: string }[] = [];
  
  for (const uni of universities) {
    for (const course of uni.courses) {
      params.push({
        uniSlug: uni.slug,
        courseSlug: course.slug,
      });
    }
  }
  
  return params;
}

// Dynamic metadata for SEO - This is what appears in Google Search Results
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uniSlug, courseSlug } = await params;
  const data = getCourseBySlug(uniSlug, courseSlug);

  if (!data) {
    return {
      title: "Course Not Found | Coast",
    };
  }

  const { university, course } = data;

  return {
    // This appears as the blue link in Google Search Results
    title: `${course.title} Past Papers - ${university.name} | Coast`,
    // This appears as the description snippet in Google Search Results
    description: `Download ${course.title} past exam papers and OCR-verified solutions. Practice specifically for ${university.name} exams with step-by-step explanations.`,
    openGraph: {
      title: `${course.title} Past Papers - ${university.name}`,
      description: `Access ${course.title} past papers, exam solutions, and practice questions for ${university.name} students.`,
      type: "website",
    },
    keywords: [
      `${course.title} past papers`,
      `${course.title} ${university.name}`,
      `${course.title} exam solutions`,
      `${university.name} past exams`,
      `${course.title} practice questions`,
    ],
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { uniSlug, courseSlug } = await params;
  
  return <CoursePageClient uniSlug={uniSlug} courseSlug={courseSlug} />;
}
