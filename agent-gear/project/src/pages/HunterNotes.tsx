import React, { useState } from 'react';
import { Book, Search, Save, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Note {
  id: number;
  timestamp: string;
  category: 'Recon' | 'Scan' | 'Exploit';
  content: string;
}

export function HunterNotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Recon' | 'Scan' | 'Exploit'>('all');
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      timestamp: '2025-02-24 10:22:21',
      category: 'Recon',
      content: 'Initial reconnaissance completed on target. Found the following subdomains:\n- admin.example.com\n- api.example.com\n- dev.example.com',
    },
    {
      id: 2,
      timestamp: '2025-02-24 10:23:45',
      category: 'Scan',
      content: 'Nmap scan revealed open ports:\n- 80/tcp (HTTP)\n- 443/tcp (HTTPS)\n- 22/tcp (SSH)\n- 3306/tcp (MySQL)',
    },
    {
      id: 3,
      timestamp: '2025-02-24 10:25:30',
      category: 'Exploit',
      content: 'Successfully identified XSS vulnerability in the search parameter:\n```\n<script>alert(document.cookie)</script>\n```\nImpact: Potential session hijacking',
    },
  ]);

  const toggleNoteExpansion = (id: number) => {
    setExpandedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  const handleEditNote = (id: number, newContent: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const handleSaveNotes = () => {
    const data = JSON.stringify(notes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hunter-notes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearNotes = () => {
    if (window.confirm('Are you sure you want to clear all notes? This action cannot be undone.')) {
      setNotes([]);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.timestamp.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Book className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Hunter Notes</h1>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-black border border-[var(--primary)] rounded p-2"
            >
              <option value="all">All Categories</option>
              <option value="Recon">Recon</option>
              <option value="Scan">Scan</option>
              <option value="Exploit">Exploit</option>
            </select>

            <button onClick={handleSaveNotes} className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Notes</span>
            </button>

            <button
              onClick={handleClearNotes}
              className="flex items-center space-x-2 bg-red-900 hover:bg-red-800"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="border border-[var(--primary)] rounded p-4"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleNoteExpansion(note.id)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-[var(--primary)]">{note.timestamp}</span>
                    <span className="px-2 py-1 text-sm border border-[var(--primary)] rounded">
                      {note.category}
                    </span>
                  </div>
                  {expandedNotes.includes(note.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>

                {expandedNotes.includes(note.id) && (
                  <div className="mt-4">
                    {editingNote === note.id ? (
                      <textarea
                        value={note.content}
                        onChange={(e) => handleEditNote(note.id, e.target.value)}
                        className="w-full h-40 font-mono"
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap font-mono">{note.content}</pre>
                    )}
                    <div className="mt-2">
                      <button
                        onClick={() =>
                          editingNote === note.id
                            ? setEditingNote(null)
                            : setEditingNote(note.id)
                        }
                        className="text-sm px-3 py-1"
                      >
                        {editingNote === note.id ? 'Save' : 'Edit'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}