'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

export default function CommentsSection({ mediaId }: { mediaId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`ftvision_comments_${mediaId}`) || '[]');
    setComments(saved);
  }, [mediaId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      author: author.trim() || 'متابع FTVision',
      text: text.trim(),
      date: new Date().toLocaleDateString('ar-SA'),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`ftvision_comments_${mediaId}`, JSON.stringify(updated));
    setText('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <MessageSquare className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-black text-white">نقاشات وآراء المتابعين ({comments.length})</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="اسمك (اختياري)..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <textarea
          rows={3}
          placeholder="اكتب رأيك في الحلقة أو الفيلم..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-red-600/30"
        >
          <Send className="w-3.5 h-3.5" /> نشر التعليق
        </button>
      </form>

      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">لا توجد تعليقات بعد، كن أول من يشارك رأيه!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-red-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" /> {c.author}
                </span>
                <span className="text-[10px] text-slate-500">{c.date}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}