import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        // University pages
        universities: resolve(__dirname, 'university/index.html'),
        maastricht: resolve(__dirname, 'university/maastricht-university/index.html'),
        // Course pages
        dsa: resolve(__dirname, 'university/maastricht-university/data-structures-and-algorithms-past-papers/index.html'),
        graphTheory: resolve(__dirname, 'university/maastricht-university/graph-theory-past-papers/index.html'),
        quantMethods: resolve(__dirname, 'university/maastricht-university/quantitative-methods-ii-past-papers/index.html'),
        linearAlgebra: resolve(__dirname, 'university/maastricht-university/linear-algebra-past-papers/index.html'),
        macroeconomics: resolve(__dirname, 'university/maastricht-university/macroeconomics-past-papers/index.html'),
        analysisII: resolve(__dirname, 'university/maastricht-university/analysis-ii-past-papers/index.html'),
        nlp: resolve(__dirname, 'university/maastricht-university/natural-language-processing-past-papers/index.html'),
        mathModelling: resolve(__dirname, 'university/maastricht-university/mathematical-modelling-past-papers/index.html'),
        probability: resolve(__dirname, 'university/maastricht-university/probability-theory-past-papers/index.html'),
      },
    },
  },
});
