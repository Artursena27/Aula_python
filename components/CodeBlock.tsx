import React from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  // Simple syntax highlighting regex strategies
  const highlight = (text: string) => {
    // Escape HTML to prevent injection
    let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Python Keywords
    safeText = safeText.replace(
      /\b(def|class|return|import|from|if|else|elif|for|while|try|except|with|as|pass|print)\b/g,
      '<span class="text-pink-400 font-bold">$1</span>'
    );
    
    // Self
    safeText = safeText.replace(/\b(self)\b/g, '<span class="text-orange-300 italic">$1</span>');
    
    // Decorators
    safeText = safeText.replace(/(@\w+)/g, '<span class="text-yellow-300">$1</span>');

    // Strings
    safeText = safeText.replace(/(['"])(.*?)\1/g, '<span class="text-green-300">$1$2$1</span>');
    
    // Comments
    safeText = safeText.replace(/(#.*)/g, '<span class="text-slate-500 italic">$1</span>');
    
    // Class names
    safeText = safeText.replace(/\bclass\s+(\w+)/g, 'class <span class="text-yellow-300 font-bold">$1</span>');
    
    // Function names
    safeText = safeText.replace(/\bdef\s+(\w+)/g, 'def <span class="text-blue-300 font-bold">$1</span>');

    return safeText;
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 border border-slate-700 bg-[#1e1e1e] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-slate-400 font-mono">python</span>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;