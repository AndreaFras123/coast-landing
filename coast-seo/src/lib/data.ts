// lib/data.ts - Data source for universities and courses

export interface Course {
  title: string;
  slug: string;
  hasPaper: boolean;
  description: string;
  topics: string[];
}

export interface University {
  name: string;
  slug: string;
  courses: Course[];
}

export const universities: University[] = [
  {
    name: "Maastricht University",
    slug: "maastricht-university",
    courses: [
      {
        title: "Data Structures and Algorithms",
        slug: "data-structures-and-algorithms-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Data Structures and Algorithms past papers from Maastricht University. Access exam solutions, practice questions on arrays, linked lists, trees, graphs, and sorting algorithms. Master complexity analysis with OCR-verified answers and step-by-step explanations tailored for Maastricht CS students.",
        topics: ["Arrays & Linked Lists", "Stacks & Queues", "Trees & Binary Search Trees", "Graph Algorithms", "Sorting & Searching", "Time & Space Complexity"]
      },
      {
        title: "Graph Theory",
        slug: "graph-theory-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Graph Theory past papers from Maastricht University. Access exam solutions, practice questions on planar graphs, Eulerian paths, and network flow problems. Master graph coloring and spanning trees with OCR-verified answers tailored for Maastricht students.",
        topics: ["Paths & Cycles", "Trees & Spanning Trees", "Planar Graphs", "Graph Coloring", "Network Flow", "Eulerian & Hamiltonian Paths"]
      },
      {
        title: "Quantitative Methods II",
        slug: "quantitative-methods-ii-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Quantitative Methods II past papers from Maastricht University. Access exam solutions for regression analysis, hypothesis testing, and econometric modeling. Practice ANOVA, time series, and panel data questions with OCR-verified answers for Maastricht Business and Economics students.",
        topics: ["Multiple Regression", "Hypothesis Testing", "ANOVA", "Time Series Analysis", "Panel Data", "Instrumental Variables"]
      },
      {
        title: "Linear Algebra",
        slug: "linear-algebra-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Linear Algebra past papers from Maastricht University. Access exam solutions for vectors, matrices, and linear transformations. Practice eigenvalue problems, determinants, and vector spaces with OCR-verified step-by-step solutions for Maastricht students.",
        topics: ["Vectors & Matrices", "Linear Transformations", "Eigenvalues & Eigenvectors", "Determinants", "Vector Spaces", "Orthogonality"]
      },
      {
        title: "Macroeconomics",
        slug: "macroeconomics-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Macroeconomics past papers from Maastricht University. Access exam solutions covering GDP, inflation, unemployment, and monetary policy. Practice fiscal policy and economic growth model questions with OCR-verified answers for Maastricht Economics students.",
        topics: ["GDP & National Income", "Inflation & Unemployment", "Monetary Policy", "Fiscal Policy", "International Trade", "Economic Growth Models"]
      },
      {
        title: "Analysis II",
        slug: "analysis-ii-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Analysis II past papers from Maastricht University. Access exam solutions for multivariable calculus, partial derivatives, and multiple integrals. Practice vector calculus and Stokes' theorem with OCR-verified step-by-step solutions for Maastricht Math students.",
        topics: ["Multivariable Functions", "Partial Derivatives", "Multiple Integrals", "Vector Calculus", "Line & Surface Integrals", "Stokes' Theorem"]
      },
      {
        title: "Natural Language Processing",
        slug: "natural-language-processing-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Natural Language Processing past papers from Maastricht University. Access exam solutions covering text classification, sentiment analysis, and transformer models. Practice word embeddings and attention mechanism questions with OCR-verified answers for Maastricht AI students.",
        topics: ["Text Preprocessing", "Word Embeddings", "Sequence Models", "Attention Mechanisms", "Transformers", "Named Entity Recognition"]
      },
      {
        title: "Mathematical Modelling",
        slug: "mathematical-modelling-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Mathematical Modelling past papers from Maastricht University. Access exam solutions for differential equations, optimization, and simulation methods. Practice stochastic models and game theory questions with OCR-verified answers for Maastricht students.",
        topics: ["Differential Equations", "Optimization", "Simulation Methods", "Stochastic Models", "Game Theory", "Network Models"]
      },
      {
        title: "Probability Theory",
        slug: "probability-theory-past-papers",
        hasPaper: false,
        description: "Prepare for your exam with our comprehensive collection of Probability Theory past papers from Maastricht University. Access exam solutions covering probability distributions, random variables, and limit theorems. Practice Markov chains and expected value questions with OCR-verified step-by-step solutions for Maastricht students.",
        topics: ["Probability Spaces", "Random Variables", "Distributions", "Expected Value & Variance", "Central Limit Theorem", "Markov Chains"]
      },
    ],
  },
];

// Helper functions
export function getUniversityBySlug(slug: string): University | undefined {
  return universities.find((uni) => uni.slug === slug);
}

export function getCourseBySlug(
  uniSlug: string,
  courseSlug: string
): { university: University; course: Course } | undefined {
  const university = getUniversityBySlug(uniSlug);
  if (!university) return undefined;

  const course = university.courses.find((c) => c.slug === courseSlug);
  if (!course) return undefined;

  return { university, course };
}
