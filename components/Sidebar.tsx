import React from 'react';
import { ContentType, MenuItem } from '../types';
import { BookOpen, Box, Layers, Terminal } from 'lucide-react';

interface SidebarProps {
  activeTab: ContentType | null;
  onSelect: (tab: ContentType) => void;
}

const menuItems: MenuItem[] = [
  {
    id: ContentType.OOP,
    title: 'Orientação a Objetos',
    description: 'Classes, construtores, métodos e boas práticas.',
    icon: 'box'
  },
  {
    id: ContentType.API,
    title: 'Ambientes e APIs',
    description: 'Herança, venv, arquivos e sua primeira API.',
    icon: 'layers'
  }
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelect }) => {
  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center gap-2">
          <Terminal className="w-8 h-8 text-blue-400" />
          Python AI
        </h1>
        <p className="text-slate-400 text-sm mt-2">Guia interativo masterclass</p>
      </div>

      <nav className="p-4 space-y-4">
        {menuItems.map((item) => {
           const Icon = item.icon === 'box' ? Box : Layers;
           const isActive = activeTab === item.id;
           
           return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 group border ${
                isActive 
                  ? 'bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                  : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                  <Icon size={20} />
                </div>
                <span className={`font-semibold ${isActive ? 'text-blue-100' : 'text-slate-300 group-hover:text-white'}`}>
                  {item.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-[3.25rem]">
                {item.description}
              </p>
            </button>
           );
        })}
      </nav>
      
      <div className="mt-auto p-6">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Dica Pro</h3>
          <p className="text-xs text-slate-400">
            Selecione um módulo acima. A IA irá gerar explicações únicas e analogias criativas para facilitar seu aprendizado.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;