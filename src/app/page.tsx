'use client';

import { orgTheme } from '@/config/theme';
import { demoForms } from '@/lib/demo-data';
import { getFormStatus } from '@/types';
import StickyNav from '@/components/ui/StickyNav';
import ParallaxHero from '@/components/animations/ParallaxHero';
import RollingCarousel from '@/components/animations/RollingCarousel';
import FloatingOrbs from '@/components/animations/FloatingOrbs';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  FileText,
  Users,
  CalendarDays,
  ExternalLink,
  Heart,
  Sparkles,
  Globe,
} from 'lucide-react';

function SectionWrapper({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage() {
  const activeForms = demoForms.filter((f) => getFormStatus(f) === 'active');

  return (
    <main className="min-h-screen relative">
      {/* Floating Background Orbs */}
      <FloatingOrbs />

      {/* Sticky Navigation */}
      <StickyNav />

      {/* Hero Section */}
      <ParallaxHero />

      {/* Rolling Image Carousel */}
      <SectionWrapper className="py-16 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center">
            Our <span className="gradient-text">Community</span> in Action
          </h2>
          <p className="text-muted text-center mt-3 max-w-xl mx-auto">
            From summits to daily programs, see how we bring generations together
          </p>
        </div>
        <RollingCarousel />
      </SectionWrapper>

      {/* Stats Section */}
      <SectionWrapper className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users size={28} />, value: '500+', label: 'Community Members' },
              { icon: <CalendarDays size={28} />, value: '50+', label: 'Events Hosted' },
              { icon: <Heart size={28} />, value: '200+', label: 'Dosti Pairs' },
              { icon: <Globe size={28} />, value: '15+', label: 'Programs Active' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                    style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-heading font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted mt-1">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Active Forms Section */}
      <SectionWrapper id="forms" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
              <Sparkles size={14} />
              Open for Submissions
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              Join Our <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
              Fill out a form below to become part of the {orgTheme.orgName} family
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeForms.map((form, i) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/forms/${form.slug}`}>
                  <Card hover padding="none" className="overflow-hidden group">
                    {/* Card Header Gradient */}
                    <div
                      className="h-2"
                      style={{
                        background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
                      }}
                    />

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="p-2.5 rounded-xl"
                          style={{ background: 'var(--color-primary-light)' }}
                        >
                          <FileText size={20} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>

                      <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {form.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2 mb-4">
                        {form.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border-light">
                        <span className="text-xs text-muted">
                          {form._response_count} responses
                        </span>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          Fill Form
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                About <span className="gradient-text">{orgTheme.orgName}</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                {orgTheme.orgDescription}
              </p>
              <p className="text-muted leading-relaxed mb-8">
                We believe that age is truly just a number. Through our programs like Dosti, 
                Swatantra, and Pragathi, we create meaningful connections between generations, 
                empower seniors with digital literacy, and celebrate the wisdom of our elders.
              </p>
              <a
                href={orgTheme.orgWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" icon={<ExternalLink size={16} />}>
                  Visit Our Website
                </Button>
              </a>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {orgTheme.heroImages.slice(0, 4).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`relative rounded-2xl overflow-hidden shadow-soft ${
                      i === 0 ? 'col-span-2 h-48' : 'h-36'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={orgTheme.logoUrl}
                  alt={orgTheme.orgName}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-heading font-bold">{orgTheme.orgName}</p>
                <p className="text-xs text-muted">{orgTheme.orgTagline}</p>
              </div>
            </div>

            <p className="text-sm text-muted text-center">{orgTheme.footerText}</p>

            <div className="flex items-center gap-4">
              {orgTheme.socialLinks.instagram && (
                <a
                  href={orgTheme.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              )}
              {orgTheme.socialLinks.linkedin && (
                <a
                  href={orgTheme.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-muted">{orgTheme.poweredByText}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
