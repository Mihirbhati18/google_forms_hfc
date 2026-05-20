'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useFormBuilderStore } from '@/stores/formBuilderStore';
import { getDemoFormById, getDemoQuestions } from '@/lib/demo-data';
import { Question, QuestionType } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ArrowLeft, Save, Plus, Type, AlignLeft, CheckSquare, List, Calendar, Phone, Upload, Star, Minus, GripVertical, Trash2, Edit2, Check } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Icons for each question type
const typeIcons: Record<QuestionType, React.ReactNode> = {
  short_text: <Type size={18} />,
  long_text: <AlignLeft size={18} />,
  multiple_choice: <CheckCircleIcon size={18} />,
  checkboxes: <CheckSquare size={18} />,
  dropdown: <List size={18} />,
  date: <Calendar size={18} />,
  phone: <Phone size={18} />,
  file_upload: <Upload size={18} />,
  rating: <Star size={18} />,
  section_header: <Minus size={18} />
};

function CheckCircleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

const typeLabels: Record<QuestionType, string> = {
  short_text: 'Short Text',
  long_text: 'Long Text',
  multiple_choice: 'Multiple Choice',
  checkboxes: 'Checkboxes',
  dropdown: 'Dropdown',
  date: 'Date',
  phone: 'Phone Number',
  file_upload: 'File Upload',
  rating: 'Rating',
  section_header: 'Section Header'
};

// Sortable Item Component
function SortableQuestion({ 
  id, 
  question, 
  isExpanded, 
  onToggleExpand, 
  onDelete 
}: { 
  id: string, 
  question: Question, 
  isExpanded: boolean, 
  onToggleExpand: () => void, 
  onDelete: () => void 
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { updateQuestion } = useFormBuilderStore();
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`mb-4 ${isDragging ? 'opacity-50' : ''}`}>
      <Card padding="none" className={`border-2 ${isExpanded ? 'border-primary shadow-md' : 'border-border hover:border-border-light'}`}>
        {/* Header Row (Always visible) */}
        <div className="flex items-center p-3 gap-3 bg-surface rounded-t-2xl">
          <div {...attributes} {...listeners} className="p-2 cursor-grab active:cursor-grabbing text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors">
            <GripVertical size={20} />
          </div>
          
          <div className="p-2 rounded-lg bg-surface-hover text-muted flex-shrink-0">
            {typeIcons[question.type as QuestionType]}
          </div>
          
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={question.label}
              onChange={(e) => updateQuestion(id, { label: e.target.value })}
              className="w-full bg-transparent font-medium text-foreground focus:outline-none focus:border-b-2 focus:border-primary px-1 py-1 truncate"
              placeholder="Question text"
            />
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0 pr-2">
            <label className="flex items-center gap-2 mr-4 cursor-pointer">
              <span className="text-xs font-medium text-muted hidden sm:inline">Required</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={question.required}
                  onChange={(e) => updateQuestion(id, { required: e.target.checked })}
                />
                <div className="w-8 h-4 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
            
            <button 
              onClick={onToggleExpand}
              className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-primary-light text-primary' : 'text-muted hover:bg-surface-hover hover:text-foreground'}`}
              title="Edit details"
            >
              <Edit2 size={18} />
            </button>
            <button 
              onClick={onDelete}
              className="p-2 text-muted hover:text-error hover:bg-error-light rounded-lg transition-colors"
              title="Delete question"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Expanded Editor */}
        {isExpanded && (
          <div className="p-5 border-t border-border bg-surface-hover/30 rounded-b-2xl space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Help Text (Optional)</label>
              <input
                type="text"
                value={question.help_text || ''}
                onChange={(e) => updateQuestion(id, { help_text: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary"
                placeholder="E.g., Please provide your full legal name"
              />
            </div>

            {/* Options for MCQ/Checkbox/Dropdown */}
            {['multiple_choice', 'checkboxes', 'dropdown'].includes(question.type) && question.options && (
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-foreground">Options</label>
                {question.options.map((opt: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...(question.options || [])];
                        newOpts[i] = e.target.value;
                        updateQuestion(id, { options: newOpts });
                      }}
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => {
                        const newOpts = (question.options || []).filter((_: unknown, idx: number) => idx !== i);
                        updateQuestion(id, { options: newOpts });
                      }}
                      className="p-2 text-muted hover:text-error"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    updateQuestion(id, { options: [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`] });
                  }}
                  className="text-sm text-primary font-medium flex items-center gap-1 hover:underline mt-2"
                >
                  <Plus size={14} /> Add Option
                </button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
// Helper X icon since it was missing in imports for SortableQuestion
function X({size}:{size:number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
}


export default function FormEditor() {
  const params = useParams();
  const id = params.id as string;
  
  const { form, questions, setForm, setQuestions, addQuestion, updateForm, deleteQuestion, reorderQuestions, isDirty, markClean } = useFormBuilderStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    // Load demo data
    const f = getDemoFormById(id);
    if (f) {
      setForm(f);
      setQuestions(getDemoQuestions(f.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderQuestions(active.id as string, over.id as string);
    }
  };

  const handleSave = () => {
    // Simulate save
    markClean();
    alert('Changes saved successfully! (Demo Mode)');
  };

  if (!form) return <div className="p-8 text-center text-muted animate-pulse">Loading editor...</div>;

  const embedCode = `<iframe src="${window.location.origin}/forms/${form.slug}" width="100%" height="800px" frameborder="0" style="border:none; border-radius:16px; overflow:hidden;"></iframe>`;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 bg-background/80 backdrop-blur-xl py-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Link href="/admin/forms" className="p-2 rounded-xl hover:bg-surface-hover transition-colors text-muted hover:text-foreground">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="font-heading text-xl md:text-2xl font-bold truncate max-w-[300px] md:max-w-md">{form.title}</h1>
            <p className="text-xs text-muted flex items-center gap-2">
              {isDirty ? <span className="text-warning flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span> Unsaved changes</span> : <span className="text-success flex items-center gap-1"><Check size={12} /> Saved</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/forms/${form.slug}`} target="_blank">
            <Button variant="ghost" size="sm">Preview</Button>
          </Link>
          <Button onClick={handleSave} variant={isDirty ? 'primary' : 'secondary'} size="sm" icon={<Save size={16} />}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Questions Builder */}
        <div className="lg:col-span-2 space-y-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
              {questions.map((q) => (
                <SortableQuestion
                  key={q.id}
                  id={q.id}
                  question={q}
                  isExpanded={expandedId === q.id}
                  onToggleExpand={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  onDelete={() => deleteQuestion(q.id)}
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* Add Question Button */}
          <div className="relative">
            <button
              onClick={() => setShowTypeSelector(!showTypeSelector)}
              className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted hover:text-primary hover:border-primary hover:bg-primary-light/50 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} /> Add New Question
            </button>

            {showTypeSelector && (
              <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border shadow-soft-lg rounded-2xl p-2 z-20 grid grid-cols-1 sm:grid-cols-2 gap-1">
                {(Object.keys(typeLabels) as QuestionType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      addQuestion(type);
                      setShowTypeSelector(false);
                      // Auto expand new question
                      setTimeout(() => {
                        const newQ = useFormBuilderStore.getState().questions.slice(-1)[0];
                        if (newQ) setExpandedId(newQ.id);
                      }, 100);
                    }}
                    className="flex items-center gap-3 p-3 text-left rounded-xl hover:bg-surface-hover transition-colors"
                  >
                    <div className="p-2 bg-surface rounded-lg text-muted">{typeIcons[type]}</div>
                    <span className="font-medium text-sm">{typeLabels[type]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Form Settings */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="space-y-5 sticky top-24">
            <h3 className="font-heading font-bold text-lg border-b border-border pb-3">Form Settings</h3>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground block">Form Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm({ title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-light transition-all text-sm font-medium"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground block">Description</label>
              <textarea
                value={form.description || ''}
                onChange={(e) => updateForm({ description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-light transition-all text-sm min-h-[80px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground block">Success Message</label>
              <textarea
                value={form.success_message}
                onChange={(e) => updateForm({ success_message: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-light transition-all text-sm min-h-[60px]"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Embed Form</h4>
              <p className="text-xs text-muted mb-3">Copy this code to embed the form on your website.</p>
              <div className="relative">
                <textarea
                  readOnly
                  value={embedCode}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-surface-hover text-muted text-xs font-mono min-h-[80px]"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(embedCode);
                    setCopiedId(true);
                    setTimeout(() => setCopiedId(false), 2000);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-surface border border-border rounded-lg text-muted hover:text-primary transition-colors"
                  title="Copy code"
                >
                  {copiedId ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
// Helper Copy icon
function Copy({size, className}:{size:number, className?:string}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
}
