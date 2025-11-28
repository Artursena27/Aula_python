import React from 'react';
import { ContentType, MenuItem } from '../types';
import { Box, Layers, BookMarked } from 'lucide-react';

interface SidebarProps {
  activeTab: ContentType | null;
  onSelect: (tab: ContentType) => void;
}

const menuItems: MenuItem[] = [
  {
    id: ContentType.OOP,
    title: 'Orientação a Objetos',
    description: 'Classes, métodos e integração.',
    icon: 'box'
  },
  {
    id: ContentType.API,
    title: 'Ambientes, Arquivos e APIs',
    description: 'Herança, venv e Web.',
    icon: 'layers'
  }
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelect }) => {
  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-y-auto z-10">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-emerald-400" />
          Python Masterclass
        </h1>
        <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-bold">Formação Completa</p>
      </div>

      <div className="px-6 py-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Conteúdo do Curso</h3>
        <nav className="space-y-3">
          {menuItems.map((item, index) => {
             const Icon = item.icon === 'box' ? Box : Layers;
             const isActive = activeTab === item.id;
             
             return (
              <div key={item.id} className="relative">
                {/* Connecting line for timeline effect */}
                {index !== menuItems.length - 1 && (
                  <div className="absolute left-[1.3rem] top-10 bottom-[-1.5rem] w-px bg-slate-800"></div>
                )}
                
                <button
                  onClick={() => onSelect(item.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group border flex items-start gap-3 ${
                    isActive 
                      ? 'bg-blue-500/10 border-blue-500/30' 
                      : 'bg-transparent border-transparent hover:bg-slate-800'
                  }`}
                >
                  <div className={`mt-0.5 p-1.5 rounded-md flex-shrink-0 ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className={`block font-medium text-sm ${isActive ? 'text-blue-100' : 'text-slate-300 group-hover:text-white'}`}>
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </button>
              </div>
             );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-xs text-slate-400 font-mono">v2.5 AI Generating</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;