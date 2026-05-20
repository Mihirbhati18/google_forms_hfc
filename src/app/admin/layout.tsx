'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { orgTheme } from '@/config/theme';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/admin/forms', label: 'Forms', icon: <FileText size={20} /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={orgTheme.logoUrl} alt={orgTheme.orgName} fill className="object-cover" />
          </div>
          <span className="font-heading font-bold">{orgTheme.orgName}</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-muted">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen bg-surface border-r border-border
          flex flex-col transition-all duration-300 admin-sidebar
          ${collapsed ? 'collapsed' : ''}
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'md:hidden' : ''}`}>
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
              <Image src={orgTheme.logoUrl} alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-heading font-bold truncate whitespace-nowrap">Admin</span>
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-muted hover:bg-surface-hover hover:text-foreground"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap
                  ${isActive 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-muted hover:bg-surface-hover hover:text-foreground'
                  }
                `}
                title={collapsed ? link.label : undefined}
              >
                <div className="shrink-0">{link.icon}</div>
                <span className={`font-medium ${collapsed ? 'md:hidden' : ''}`}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <button
            onClick={toggleDarkMode}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap text-muted hover:bg-surface-hover hover:text-foreground
            `}
            title={collapsed ? 'Toggle Theme' : undefined}
          >
            <div className="shrink-0">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</div>
            <span className={`font-medium ${collapsed ? 'md:hidden' : ''}`}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
          
          <Link
            href="/admin/login"
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap text-error hover:bg-error-light
            `}
            title={collapsed ? 'Sign Out' : undefined}
          >
            <div className="shrink-0"><LogOut size={20} /></div>
            <span className={`font-medium ${collapsed ? 'md:hidden' : ''}`}>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0 overflow-x-hidden" style={{ background: 'var(--color-background)' }}>
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
