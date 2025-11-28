import React from 'react';
import { LessonContent } from '../types';
import CodeBlock from './CodeBlock';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

interface LessonViewProps {
  content: LessonContent;
  loading: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({ content, loading }) => {
  // Loading skeleton state matches the new layout
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse space-y-8">
        <div className="h-8 bg-slate-800 rounded w-1/3 mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-2/3"></div>
        </div>
        <div className="h-64 bg-slate-800 rounded-xl mt-12"></div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-8 py-16">
      {/* Title Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">
          <GraduationCap size={18} />
          Módulo de Aprendizado
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-8 tracking-tight leading-tight">
          {content.title}
        </h1>
        
        {/* User Defined Introduction Box */}
        <div className="bg-slate-800/50 border-l-4 border-blue-500 p-6 rounded-r-xl">
          <p className="text-lg text-slate-200 leading-relaxed font-light">
            {content.introduction}
          </p>
        </div>
      </div>

      {/* Key Concepts List */}
      <div className="mb-16">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Neste guia você vai aprender:</h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {content.keyConcepts.map((concept, idx) => (
            <li key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              {concept}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-800 w-full mb-16"></div>

      {/* Main Content Loop */}
      <div className="space-y-24">
        {content.examples.map((example, idx) => (
          <section key={idx} className="scroll-mt-8">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-6xl font-black text-slate-800 select-none">
                {idx + 1}
              </span>
              <h2 className="text-3xl font-bold text-white">
                {example.title}
              </h2>
            </div>

            {/* Analogy Section - Highlighted */}
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-6 mb-8">
              <h3 className="text-blue-400 font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="text-xl">💡</span> Analogia Prática
              </h3>
              <p className="text-blue-100/90 text-lg leading-relaxed italic">
                "{example.analogy}"
              </p>
            </div>

            {/* Explanation Text */}
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-slate-300 leading-7 text-lg">
                {example.explanation}
              </p>
            </div>

            {/* Code Block */}
            <div className="mt-6">
               <div className="flex justify-between items-end mb-2 px-1">
                 <span className="text-xs text-slate-500 font-mono">exemplo_pratico_{idx + 1}.py</span>
               </div>
               <CodeBlock code={example.code} />
            </div>

            {idx < content.examples.length - 1 && (
              <div className="flex justify-center mt-16 opacity-30">
                <ArrowRight className="transform rotate-90 text-slate-500" size={32} />
              </div>
            )}
          </section>
        ))}
      </div>
      
      {/* Footer / Completion */}
      <div className="mt-24 pt-12 border-t border-slate-800 text-center">
        <div className="inline-block p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
          <BookOpen size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Módulo Concluído</h3>
        <p className="text-slate-400">Você revisou todos os conceitos desta seção.</p>
      </div>
    </article>
  );
};

export default LessonView;