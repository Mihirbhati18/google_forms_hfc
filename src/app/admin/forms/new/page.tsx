'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewFormPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('Thank you for your submission!');
  const [isActive, setIsActive] = useState(true);
  
  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Simple slugify
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    setSlug(generatedSlug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to DB and get the new ID
    // For demo, we just go to the editor of a demo form
    router.push('/admin/forms/demo-1/edit');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/forms" className="p-2 rounded-xl hover:bg-surface-hover transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="font-heading text-3xl font-bold">Create New Form</h1>
          <p className="text-muted">Set up the basic details for your new form.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">Form Title <span className="text-error">*</span></label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all font-heading font-medium"
              placeholder="e.g. Volunteer Registration"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">URL Slug</label>
            <div className="flex items-center">
              <span className="px-3 py-3 bg-surface-hover border border-r-0 border-border rounded-l-xl text-muted text-sm">
                /forms/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="flex-1 px-4 py-3 rounded-r-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
                placeholder="volunteer-registration"
                required
              />
            </div>
            <p className="text-xs text-muted mt-1">This will be the public link to your form.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all min-h-[100px] resize-y"
              placeholder="Provide some context for people filling out this form..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">Success Message</label>
            <textarea
              value={successMessage}
              onChange={(e) => setSuccessMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all min-h-[80px] resize-y"
              placeholder="Message shown after successful submission"
            />
          </div>

          <div className="flex items-center justify-between py-4 border-t border-border mt-6">
            <div>
              <h3 className="font-medium">Active Status</h3>
              <p className="text-sm text-muted">Is this form currently accepting responses?</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Link href="/admin/forms">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary" icon={<Save size={18} />}>
              Create & Build Form
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
