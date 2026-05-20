'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { orgTheme } from '@/config/theme';
import { demoStats, demoForms, demoResponses } from '@/lib/demo-data';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { FileText, Inbox, Calendar, Activity, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Generate recent submissions from demo data
  const recentSubmissions = Object.entries(demoResponses)
    .flatMap(([formId, responses]) => {
      const form = demoForms.find(f => f.id === formId);
      return responses.map(r => ({
        ...r,
        formTitle: form?.title || 'Unknown Form',
        // Try to find a name in the answers (heuristic for demo)
        submitterName: Object.values(r.answers).find(v => typeof v === 'string' && v.includes(' ')) || 'Anonymous'
      }));
    })
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, 5);

  const statsCards = [
    { 
      label: 'Total Forms', 
      value: demoStats.totalForms, 
      icon: <FileText size={24} />,
      color: 'text-primary',
      bg: 'bg-primary-light'
    },
    { 
      label: 'Total Responses', 
      value: demoStats.totalResponses, 
      icon: <Inbox size={24} />,
      color: 'text-secondary',
      bg: 'bg-secondary-light'
    },
    { 
      label: 'Responses Today', 
      value: demoStats.responsesToday, 
      icon: <Calendar size={24} />,
      color: 'text-success',
      bg: 'bg-success-light'
    },
    { 
      label: 'Most Active', 
      value: demoStats.mostActiveForm?.responseCount || 0, 
      subtext: demoStats.mostActiveForm?.title,
      icon: <Activity size={24} />,
      color: 'text-warning',
      bg: 'bg-warning-light'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Welcome to {orgTheme.orgName}</h1>
        <p className="text-muted text-lg">Here&apos;s what&apos;s happening with your forms today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <Card key={i} className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </>
              ) : (
                <>
                  <h3 className="font-heading text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted font-medium">{stat.label}</p>
                  {stat.subtext && (
                    <p className="text-xs text-muted mt-1 truncate" title={stat.subtext}>
                      {stat.subtext}
                    </p>
                  )}
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Submissions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold">Recent Submissions</h2>
          <Link href="/admin/forms" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <Card padding="none" className="overflow-hidden">
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentSubmissions.map((submission) => (
                <Link 
                  key={submission.id}
                  href={`/admin/forms`} // Would link to specific response view in real app
                  className="flex items-center justify-between p-4 hover:bg-surface-hover transition-colors group"
                >
                  <div>
                    <p className="font-medium mb-1">{String(submission.submitterName)}</p>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <span>{submission.formTitle}</span>
                      <span>&bull;</span>
                      <span>{formatDistanceToNow(new Date(submission.submitted_at))} ago</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted group-hover:text-primary transition-colors" />
                </Link>
              ))}
              {recentSubmissions.length === 0 && (
                <div className="p-8 text-center text-muted">
                  No recent submissions found.
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
