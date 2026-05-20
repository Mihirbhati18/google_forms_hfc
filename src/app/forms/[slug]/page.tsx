'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { orgTheme } from '@/config/theme';
import { getDemoFormBySlug, getDemoQuestions } from '@/lib/demo-data';
import { useFormSubmissionStore } from '@/stores/formSubmissionStore';
import { getFormStatus, Form, Question } from '@/types';
import FormRenderer from '@/components/form/FormRenderer';
import RollingCarousel from '@/components/animations/RollingCarousel';
import FloatingOrbs from '@/components/animations/FloatingOrbs';
import StickyNav from '@/components/ui/StickyNav';
import { AlertCircle, Clock, Ban, ArrowLeft } from 'lucide-react';

function FormClosedState({ reason, form }: { reason: string; form?: Form }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-background)' }}>
      <div className="text-center max-w-md">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--color-error-light)' }}
        >
          {reason === 'closed' ? (
            <Clock size={36} style={{ color: 'var(--color-error)' }} />
          ) : reason === 'full' ? (
            <Ban size={36} style={{ color: 'var(--color-error)' }} />
          ) : (
            <AlertCircle size={36} style={{ color: 'var(--color-error)' }} />
          )}
        </div>
        <h1 className="font-heading text-2xl font-bold mb-3">
          {reason === 'closed'
            ? 'This form is no longer accepting responses'
            : reason === 'full'
            ? 'Maximum responses reached'
            : reason === 'scheduled'
            ? 'This form is not yet open'
            : 'Form not found'}
        </h1>
        <p className="text-muted mb-6">
          {reason === 'scheduled' && form?.opens_at
            ? `This form opens on ${new Date(form.opens_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}`
            : 'Please contact the organizer for more information.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors"
          style={{ background: 'var(--color-primary)', color: 'white' }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function PublicFormPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { isSubmitting, setSubmitting, reset, answers } = useFormSubmissionStore();
  const [form, setForm] = useState<Form | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load form data (demo mode)
    const demoForm = getDemoFormBySlug(slug);
    if (demoForm) {
      setForm(demoForm);
      setQuestions(getDemoQuestions(demoForm.id));
    } else {
      setError('not_found');
    }
    setLoading(false);
    reset();
  }, [slug, reset]);

  const handleSubmit = useCallback(async () => {
    if (!form || isSubmitting) return;

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', { formId: form.id, answers });

    setSubmitting(false);
    router.push(`/forms/${slug}/success?msg=${encodeURIComponent(form.success_message)}`);
  }, [form, isSubmitting, setSubmitting, answers, router, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4" style={{ background: 'var(--color-primary-light)' }} />
          <div className="h-4 w-48 rounded mx-auto" style={{ background: 'var(--color-border)' }} />
        </div>
      </div>
    );
  }

  if (error || !form) {
    return <FormClosedState reason={error || 'not_found'} />;
  }

  const status = getFormStatus(form);

  if (status === 'closed') return <FormClosedState reason="closed" form={form} />;
  if (status === 'scheduled') return <FormClosedState reason="scheduled" form={form} />;
  if (status === 'draft') return <FormClosedState reason="closed" form={form} />;

  return (
    <main className="min-h-screen relative" style={{ background: 'var(--color-background)' }}>
      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Navigation */}
      <StickyNav />

      {/* Hero Banner */}
      <div className="relative pt-20 pb-8 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-12 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/30">
              <Image
                src={orgTheme.logoUrl}
                alt={orgTheme.orgName}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-glow">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-white/85 text-lg max-w-xl mx-auto leading-relaxed">
              {form.description}
            </p>
          )}
        </div>
      </div>

      {/* Rolling Carousel */}
      <div className="py-6">
        <RollingCarousel />
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 py-10 relative z-10">
        <FormRenderer
          questions={questions}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border">
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={orgTheme.logoUrl}
              alt={orgTheme.orgName}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <span className="text-sm text-muted">{orgTheme.poweredByText}</span>
        </div>
      </footer>
    </main>
  );
}
