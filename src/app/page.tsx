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
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-5xl space-y-12 z-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-purple-300 mb-4">
            ✨ AI Powered Renaming
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
            AI Bulk Renamer
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
            Renommez des milliers de fichiers en une seconde avec la puissance de l'IA.
            <br/>Simplement magique.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-8">
          
          {/* Prompt Bar */}
          <div className="flex gap-4">
            <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-2 flex items-center focus-within:ring-2 focus-within:ring-purple-500/50 transition-all">
              <div className="p-3">
                <Wand2 className="w-6 h-6 text-purple-400" />
              </div>
              <input 
                type="text" 
                placeholder="Ex: Convertis en snake_case et ajoute la date..." 
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-slate-500 px-2 h-full"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <button 
              onClick={handleGenerate}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-purple-900/20 hover:scale-105 active:scale-95"
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
              border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer group
              ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30'}
            `}
          >
            <div className="flex flex-col items-center gap-6">
              <div className={`p-6 rounded-full transition-all duration-300 ${isDragging ? 'bg-purple-500/20 scale-110' : 'bg-white/5 group-hover:scale-110'}`}>
                <Upload className={`w-10 h-10 ${isDragging ? 'text-purple-400' : 'text-slate-400'}`} />
              </div>
              <div>
                <p className="text-2xl font-medium text-white mb-2">Glissez vos fichiers ici</p>
                <p className="text-slate-500">Supporte images, documents, vidéos...</p>
              </div>
            </div>
          </div>

          {/* Preview List */}
          {files.length > 0 && (
            <div className="bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 p-4 border-b border-white/5 bg-white/5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div>Original</div>
                <div></div>
                <div>Résultat IA</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                {files.map((file, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr,auto,1fr] gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3 text-slate-300 truncate">
                      <FileText className="w-5 h-5 shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
                      <span className="truncate font-mono text-sm">{file.originalName}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-700" />
                    <div className={`flex items-center gap-2 font-mono text-sm ${file.newName ? 'text-emerald-400' : 'text-slate-600 italic'}`}>
                      {file.newName || 'En attente...'}
                      {file.newName && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        {files.length > 0 && (
          <div className="flex justify-center pb-8">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl shadow-emerald-900/30 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-3">
              <Check className="w-6 h-6" />
              Valider et Renommer ({files.length})
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
