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
    <main className="min-h-screen bg-[#FDFDFD] text-[#0A0A0A] p-6 flex flex-col items-center justify-center font-sans selection:bg-black selection:text-white">
      
      <div className="w-full max-w-4xl space-y-12">
        
        {/* Header (Minimalist) */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 uppercase tracking-wider">
            <Wand2 className="w-3 h-3" />
            AI Bulk Renamer v1.0
          </div>
          
          <h1 className="text-6xl font-bold tracking-tighter text-black">
            Organize files.<br/>
            <span className="text-slate-400">In seconds.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
            Drag, drop, and let AI structure your chaos into perfectly named files.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Prompt (Span 12) */}
          <div className="md:col-span-12 bg-white rounded-2xl border border-slate-200 p-1 shadow-sm hover:shadow-md transition-all group focus-within:ring-2 focus-within:ring-black/5">
            <div className="flex items-center h-14 px-4 bg-slate-50/50 rounded-xl border border-transparent group-focus-within:bg-white transition-colors">
              <Wand2 className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Describe how to rename (e.g. 'snake_case with dates')..." 
                className="flex-1 bg-transparent border-none outline-none text-base text-black placeholder:text-slate-400 h-full"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="h-6 w-[1px] bg-slate-200 mx-3"></div>
              <button 
                onClick={handleGenerate}
                className="text-sm font-semibold text-black hover:text-slate-600 transition-colors px-2"
              >
                Generate →
              </button>
            </div>
          </div>

          {/* Card 2: Upload (Span 5) */}
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`
              md:col-span-5 bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group
              ${isDragging ? 'ring-2 ring-black bg-slate-50' : ''}
            `}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
            
            <div className="h-12 w-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="font-semibold text-black">Upload Files</h3>
            <p className="text-sm text-slate-400 mt-1">Drag & drop or click</p>
          </div>

          {/* Card 3: Preview List (Span 7) */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-[320px]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-2">Changes Preview</span>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{files.length} items</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {files.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <FileText className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm">Waiting for files...</p>
                </div>
              ) : (
                files.map((file, idx) => (
                  <div key={idx} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    <span className="text-slate-400 line-through truncate max-w-[120px]">{file.originalName}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                    <span className={`font-mono font-medium truncate flex-1 ${file.newName ? 'text-black' : 'text-slate-300'}`}>
                      {file.newName || 'Processing...'}
                    </span>
                    {file.newName && <Check className="w-3 h-3 text-emerald-500" />}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Bar (Span 12) */}
          {files.length > 0 && (
            <div className="md:col-span-12 flex justify-end">
              <button className="bg-[#0A0A0A] hover:bg-black text-white px-6 py-3 rounded-xl font-medium text-sm shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Commit Changes
              </button>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
