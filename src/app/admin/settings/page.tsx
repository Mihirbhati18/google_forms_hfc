'use client';

import { orgTheme } from '@/config/theme';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { User, Building, Palette, Code, Save } from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Platform Settings</h1>
        <p className="text-muted">Manage your admin profile and view organization settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2">
            <User size={18} className="text-primary" />
            Admin Profile
          </h2>
          <p className="text-sm text-muted">Your personal account settings.</p>
        </div>
        <Card className="md:col-span-2 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">Full Name</label>
            <input
              type="text"
              defaultValue="Admin User"
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-hover text-muted cursor-not-allowed"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground block">Email Address</label>
            <input
              type="email"
              defaultValue={orgTheme.adminEmail}
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-hover text-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted mt-1">Managed via authentication provider.</p>
          </div>
          <div className="pt-2">
            <Button disabled icon={<Save size={16} />}>Save Changes</Button>
          </div>
        </Card>
      </div>

      <div className="h-px bg-border my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2">
            <Building size={18} className="text-primary" />
            Organization
          </h2>
          <p className="text-sm text-muted">Branding and identity configured in theme.</p>
        </div>
        <Card className="md:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border shrink-0">
              <Image src={orgTheme.logoUrl} alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{orgTheme.orgName}</h3>
              <p className="text-sm text-muted">{orgTheme.orgTagline}</p>
              <a href={orgTheme.orgWebsite} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block">
                {orgTheme.orgWebsite}
              </a>
            </div>
          </div>
          <div className="p-4 bg-secondary-light rounded-xl flex items-start gap-3">
            <div className="mt-0.5"><Badge variant="info">Note</Badge></div>
            <p className="text-sm text-secondary">
              Organization details are currently managed via the <code className="bg-white/50 px-1 py-0.5 rounded">theme.ts</code> configuration file.
              Multi-tenant database configuration is required to edit these here.
            </p>
          </div>
        </Card>
      </div>

      <div className="h-px bg-border my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2">
            <Palette size={18} className="text-primary" />
            Theme Colors
          </h2>
          <p className="text-sm text-muted">Current active color palette.</p>
        </div>
        <Card className="md:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Primary', var: 'var(--color-primary)' },
              { name: 'Secondary', var: 'var(--color-secondary)' },
              { name: 'Accent', var: 'var(--color-accent)' },
              { name: 'Background', var: 'var(--color-background)', border: true },
            ].map((color) => (
              <div key={color.name} className="space-y-2">
                <div 
                  className={`w-full h-12 rounded-xl shadow-inner ${color.border ? 'border border-border' : ''}`}
                  style={{ background: color.var }}
                />
                <p className="text-xs font-medium text-center">{color.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="h-px bg-border my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-8">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2">
            <Code size={18} className="text-primary" />
            Developers
          </h2>
          <p className="text-sm text-muted">API and integration settings.</p>
        </div>
        <Card className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Webhooks</h3>
              <p className="text-sm text-muted">Send responses to other services</p>
            </div>
            <Badge variant="warning">Coming Soon</Badge>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">API Keys</h3>
              <p className="text-sm text-muted">Manage programmatic access</p>
            </div>
            <Badge variant="warning">Coming Soon</Badge>
          </div>
        </Card>
      </div>

    </div>
  );
}
