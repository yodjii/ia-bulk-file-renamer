'use client';

import { useState } from 'react';
import { Upload, Wand2, FileText, ArrowRight, Check, X } from 'lucide-react';

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Call to API
  const handleGenerate = async () => {
    if (!prompt) return;
    
    // Set loading state (todo)
    const filesToSend = files.map(f => ({ originalName: f.originalName }));
    
    try {
      const response = await fetch('/api/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: filesToSend, prompt })
      });
      
      const data = await response.json();
      
      if (data.files) {
         // Merge results
         const updatedFiles = files.map(f => {
            const match = data.files.find((res: any) => res.originalName === f.originalName);
            return match ? { ...f, newName: match.newName } : f;
         });
         setFiles(updatedFiles);
      }
    } catch (error) {
      console.error("Failed to generate names", error);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock file upload
    const droppedFiles = Array.from(e.dataTransfer.files).map(f => ({
      originalName: f.name,
      newName: null,
      status: 'pending'
    }));
    setFiles([...files, ...droppedFiles]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            ✨ AI Bulk Renamer
          </h1>
          <p className="text-slate-400">Renommez vos fichiers en masse par simple magie</p>
        </div>

        {/* Prompt Bar */}
        <div className="bg-slate-800/50 border border-slate-700 p-2 rounded-xl flex items-center shadow-lg backdrop-blur-sm">
          <div className="p-3 bg-purple-500/10 rounded-lg mr-2">
            <Wand2 className="w-6 h-6 text-purple-400" />
          </div>
          <input 
            type="text" 
            placeholder="Ex: Renomme en snake_case et ajoute la date..." 
            className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-slate-500 px-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            Générer
          </button>
        </div>

        {/* Drop Zone */}
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer
            ${isDragging ? 'border-purple-500 bg-purple-500/10 scale-[1.01]' : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'}
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${isDragging ? 'bg-purple-500/20' : 'bg-slate-800'}`}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <p className="text-xl font-medium text-slate-200">Glissez vos fichiers ici</p>
              <p className="text-sm text-slate-500 mt-1">ou cliquez pour parcourir</p>
            </div>
          </div>
        </div>

        {/* Preview List */}
        {files.length > 0 && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 p-4 border-b border-slate-800 bg-slate-900/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div>Original</div>
              <div></div>
              <div>Résultat IA</div>
            </div>
            <div className="divide-y divide-slate-800">
              {files.map((file, idx) => (
                <div key={idx} className="grid grid-cols-[1fr,auto,1fr] gap-4 p-4 items-center hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-3 text-slate-400 truncate">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">{file.originalName}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className={`flex items-center gap-2 font-mono text-sm ${file.newName ? 'text-emerald-400' : 'text-slate-600 italic'}`}>
                    {file.newName || 'En attente...'}
                    {file.newName && <Check className="w-4 h-4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Footer */}
        {files.length > 0 && (
          <div className="flex justify-end pt-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-3">
              <Check className="w-6 h-6" />
              Valider et Renommer ({files.length})
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
