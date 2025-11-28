import React from 'react';
import { LessonContent } from '../types';
import CodeBlock from './CodeBlock';
import { Lightbulb, BookOpen, CheckCircle2 } from 'lucide-react';

interface LessonViewProps {
  content: LessonContent;
  loading: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({ content, loading }) => {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse space-y-8">
        <div className="h-12 bg-slate-800 rounded-lg w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        <div className="grid gap-6 mt-12">
           {[1, 2, 3].map(i => (
             <div key={i} className="h-64 bg-slate-800 rounded-xl"></div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pb-32">
      {/* Header Section */}
      <header className="mb-12 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wide mb-4">
          <BookOpen size={14} />
          Módulo de Aprendizado
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
          {content.introduction}
        </p>
        
        <div className="mt-8 flex flex-wrap gap-3">
          {content.keyConcepts.map((concept, idx) => (
            <span key={idx} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-md text-sm border border-slate-700">
              <CheckCircle2 size={14} className="text-blue-500" />
              {concept}
            </span>
          ))}
        </div>
      </header>

      {/* Examples Section */}
      <div className="space-y-16">
        {content.examples.map((example, idx) => (
          <div key={idx} className="group relative">
            {/* Connector Line */}
            {idx !== content.examples.length - 1 && (
              <div className="absolute left-6 top-16 bottom-[-4rem] w-0.5 bg-slate-800 group-hover:bg-blue-500/30 transition-colors"></div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all shadow-lg">
                  {idx + 1}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-grow space-y-6">
                <div>
                   <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {example.title}
                  </h2>
                </div>

                {/* Analogy Box */}
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb size={100} />
                  </div>
                  <div className="flex items-start gap-3 relative z-10">
                    <Lightbulb className="flex-shrink-0 text-amber-400 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-amber-200 mb-1 text-sm uppercase tracking-wider">Analogia da Vida Real</h3>
                      <p className="text-slate-200 italic leading-relaxed">
                        "{example.analogy}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code & Explanation */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="order-2 lg:order-1">
                     <CodeBlock code={example.code} />
                  </div>
                  <div className="order-1 lg:order-2 flex flex-col justify-center">
                    <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Explicação Técnica
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {example.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonView;