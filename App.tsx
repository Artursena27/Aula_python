import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import { ContentType, LessonContent } from './types';
import { fetchLessonContent } from './services/geminiService';
import { Sparkles, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentType | null>(null);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabSelect = async (tab: ContentType) => {
    if (tab === activeTab && content) return; // Don't reload if already active and loaded

    setActiveTab(tab);
    setLoading(true);
    setError(null);
    setContent(null);

    try {
      const data = await fetchLessonContent(tab);
      setContent(data);
    } catch (err) {
      setError("Não foi possível carregar o conteúdo. Verifique sua chave de API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden text-slate-200 font-sans">
      <Sidebar activeTab={activeTab} onSelect={handleTabSelect} />
      
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        {!activeTab ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20 rotate-3 transform transition-transform hover:rotate-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Domine Python com <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Inteligência Artificial</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Selecione um tópico no menu lateral para gerar uma aula personalizada. 
              Nossa IA criará exemplos práticos e analogias do mundo real para explicar 
              Conceitos de POO, APIs e Estrutura de Projetos.
            </p>
            <div className="flex gap-4 text-sm font-medium text-slate-500 bg-slate-800/50 px-6 py-3 rounded-full border border-slate-700/50">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Gemini 2.5 Flash
              </span>
              <span className="w-px h-4 bg-slate-700"></span>
              <span>4-5 Exemplos Práticos</span>
              <span className="w-px h-4 bg-slate-700"></span>
              <span>Analogias Reais</span>
            </div>
          </div>
        ) : error ? (
           <div className="h-full flex flex-col items-center justify-center p-8 text-center">
             <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
             <h2 className="text-2xl font-bold text-white mb-2">Ops! Algo deu errado.</h2>
             <p className="text-slate-400 max-w-md">{error}</p>
             <button 
               onClick={() => handleTabSelect(activeTab)}
               className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
             >
               Tentar Novamente
             </button>
           </div>
        ) : (
          <LessonView content={content!} loading={loading} />
        )}
      </main>
    </div>
  );
};

export default App;