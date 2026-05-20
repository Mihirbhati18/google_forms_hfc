'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getDemoFormById, getDemoQuestions, getDemoResponses } from '@/lib/demo-data';
import { Form, Question, ResponseRow } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, Download, Search, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function ResponsesPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [form, setForm] = useState<Form | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Load from demo data
    const f = getDemoFormById(id);
    if (f) {
      setForm(f);
      setQuestions(getDemoQuestions(f.id).filter(q => q.type !== 'section_header'));
      setResponses(getDemoResponses(f.id));
    }
  }, [id]);

  if (!form) return <div className="p-8 text-center text-muted animate-pulse">Loading responses...</div>;

  const filteredResponses = responses.filter(r => {
    if (!search) return true;
    const s = search.toLowerCase();
    return Object.values(r.answers).some(val => 
      String(val).toLowerCase().includes(s)
    );
  });

  const handleExport = () => {
    if (responses.length === 0) return;
    
    // Create CSV header
    const headers = ['Submission Date', ...questions.map(q => `"${q.label.replace(/"/g, '""')}"`)];
    
    // Create rows
    const rows = filteredResponses.map(r => {
      const date = new Date(r.submitted_at).toISOString();
      const rowData = questions.map(q => {
        const val = r.answers[q.id];
        let strVal = '';
        if (Array.isArray(val)) strVal = val.join(', ');
        else if (val !== null && val !== undefined) strVal = String(val);
        
        // Escape quotes and wrap in quotes if contains comma
        return `"${strVal.replace(/"/g, '""')}"`;
      });
      return [date, ...rowData].join(',');
    });
    
    const csv = [headers.join(','), ...rows].join('\n');
    
    // Trigger download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.slug}-responses.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/forms" className="p-2 rounded-xl hover:bg-surface-hover transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold flex items-center gap-3">
            {form.title}
            <Badge variant="info">{responses.length} Responses</Badge>
          </h1>
        </div>
        <Button 
          variant="secondary" 
          icon={<Download size={18} />} 
          onClick={handleExport}
          disabled={responses.length === 0}
        >
          Export CSV
        </Button>
      </div>

      <Card padding="none" className="overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-hover/30">
          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search responses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Data Table Container */}
        <div className="flex-1 overflow-auto">
          {filteredResponses.length > 0 ? (
            <table className="w-full data-table border-collapse min-w-[800px]">
              <thead className="bg-surface-hover/50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="whitespace-nowrap w-48">Submitted At</th>
                  {questions.map((q) => (
                    <th key={q.id} className="min-w-[200px]" title={q.label}>
                      <div className="line-clamp-1">{q.label}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredResponses.map((response) => (
                  <tr key={response.id} className="hover:bg-surface-hover transition-colors">
                    <td className="whitespace-nowrap text-muted text-sm">
                      {format(new Date(response.submitted_at), 'MMM d, yyyy h:mm a')}
                    </td>
                    {questions.map((q) => {
                      const val = response.answers[q.id];
                      let displayVal = '-';
                      
                      if (Array.isArray(val)) {
                        displayVal = val.join(', ');
                      } else if (val !== undefined && val !== null && val !== '') {
                        displayVal = String(val);
                      }
                      
                      return (
                        <td key={q.id}>
                          <div className="line-clamp-2" title={displayVal}>
                            {displayVal}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-muted">
              <FileText size={48} className="opacity-20 mb-4" />
              <p className="font-medium text-lg text-foreground">No responses found</p>
              <p className="text-sm mt-1">
                {search ? 'Try adjusting your search query.' : 'This form hasn\'t received any submissions yet.'}
              </p>
            </div>
          )}
        </div>
        
        {/* Pagination footer (mock) */}
        {filteredResponses.length > 0 && (
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted bg-surface-hover/30">
            <div>Showing {filteredResponses.length} results</div>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 border border-border rounded-md opacity-50 cursor-not-allowed">Previous</button>
              <button disabled className="px-3 py-1 border border-border rounded-md opacity-50 cursor-not-allowed">Next</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
