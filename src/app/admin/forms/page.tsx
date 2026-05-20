'use client';

import { useState } from 'react';
import Link from 'next/link';
import { demoForms } from '@/lib/demo-data';
import { getFormStatus } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Plus, Edit2, BarChart2, Trash2, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminForms() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (slug: string, id: string) => {
    const url = `${window.location.origin}/forms/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
      alert('In demo mode, deletion is disabled.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Your Forms</h1>
          <p className="text-muted">Manage your organization&apos;s forms and view submissions.</p>
        </div>
        <Link href="/admin/forms/new">
          <Button icon={<Plus size={18} />}>Create New Form</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {demoForms.map((form) => {
          const status = getFormStatus(form);
          
          return (
            <Card key={form.id} className="flex flex-col h-full hover:shadow-soft-lg transition-all border border-border">
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant={status === 'active' ? 'success' : status === 'closed' ? 'error' : status === 'scheduled' ? 'warning' : 'neutral'}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                  <button
                    onClick={() => handleShare(form.slug, form.id)}
                    className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-primary-light"
                    title="Copy share link"
                  >
                    {copiedId === form.id ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                  </button>
                </div>
                
                <h2 className="font-heading text-xl font-bold mb-2 line-clamp-1" title={form.title}>
                  {form.title}
                </h2>
                <p className="text-muted text-sm line-clamp-2 mb-6">
                  {form.description || 'No description provided.'}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted">
                  <div className="flex items-center gap-1.5">
                    <BarChart2 size={16} />
                    <span>{form._response_count || 0} responses</span>
                  </div>
                  <div>
                    {format(new Date(form.created_at), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border p-4 flex items-center justify-between gap-3 bg-surface-hover/50 rounded-b-2xl">
                <Link href={`/admin/forms/${form.id}/edit`} className="flex-1">
                  <Button variant="secondary" className="w-full" size="sm" icon={<Edit2 size={16} />}>
                    Edit
                  </Button>
                </Link>
                <Link href={`/admin/forms/${form.id}/responses`} className="flex-1">
                  <Button variant="ghost" className="w-full bg-surface" size="sm">
                    Responses
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete()}
                  className="p-2 text-muted hover:text-error hover:bg-error-light rounded-lg transition-colors"
                  title="Delete form"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
