import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import { ContentType, LessonContent } from './types';
import { fetchLessonContent } from './services/geminiService';
import { AlertTriangle, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  // Inicializa já com OOP selecionado para parecer um site de conteúdo e não uma ferramenta
  const [activeTab, setActiveTab] = useState<ContentType>(ContentType.OOP);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar o conteúdo assim que a tab muda ou app inicia
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      // Limpa conteúdo anterior para dar feedback visual de carregamento
      setContent(null); 

      try {
        const data = await fetchLessonContent(activeTab);
        setContent(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o material didático. Verifique sua conexão ou a chave de API.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden text-slate-200 font-sans">
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto relative scroll-smooth bg-[#0b1120]">
        {loading ? (
           <div className="h-full flex flex-col items-center justify-center p-8 space-y-4">
             <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
             <p className="text-slate-400 font-medium animate-pulse">Gerando material didático completo...</p>
           </div>
        ) : error ? (
           <div className="h-full flex flex-col items-center justify-center p-8 text-center">
             <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
             <h2 className="text-2xl font-bold text-white mb-2">Erro ao carregar aula</h2>
             <p className="text-slate-400 max-w-md mb-6">{error}</p>
             <button 
               onClick={() => window.location.reload()}
               className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
             >
               Tentar Novamente
             </button>
           </div>
        ) : content ? (
          <LessonView content={content} loading={loading} />
        ) : null}
      </main>
    </div>
  );
};

export default App;