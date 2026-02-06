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
    <main className="min-h-screen bg-white text-slate-900 p-8 flex flex-col items-center justify-center font-sans">
      
      <div className="w-full max-w-5xl space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-2 bg-black rounded-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">AI Renamer</span>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Comment souhaitez-vous renommer vos fichiers ?
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
            Utilisez l'intelligence artificielle pour organiser vos documents en un clin d'œil.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Prompt & Upload */}
          <div className="space-y-8">
            
            {/* Prompt Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-slate-100 p-2 rounded-lg">1</span>
                Votre instruction
              </h2>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Ex: Convertis en snake_case et ajoute la date..." 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-slate-400"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button 
                  onClick={handleGenerate}
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                >
                  Go
                </button>
              </div>
            </div>

            {/* Upload Card */}
            <div 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`
                bg-white border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer group
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
              `}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full transition-all ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 group-hover:scale-110'}`}>
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">Uploader vos fichiers</p>
                  <p className="text-slate-500 mt-1">Glissez-déposez ou cliquez ici</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Preview */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 h-full min-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
              <span className="bg-white border border-slate-200 p-2 rounded-lg shadow-sm">2</span>
              Aperçu des résultats
            </h2>

            {files.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl m-4">
                <FileText className="w-12 h-12 mb-4 opacity-50" />
                <p>Aucun fichier sélectionné</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                {files.map((file, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                      <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                        <FileText className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm text-slate-500 line-through truncate">{file.originalName}</span>
                        <span className={`font-mono text-sm font-medium truncate ${file.newName ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {file.newName || '...'}
                        </span>
                      </div>
                    </div>
                    {file.newName && <div className="text-emerald-500 bg-emerald-50 p-1 rounded-full"><Check className="w-4 h-4" /></div>}
                  </div>
                ))}
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <button className="w-full bg-black hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-slate-200 active:translate-y-0.5">
                  Valider {files.length} fichiers
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
