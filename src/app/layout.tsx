import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { orgTheme } from "@/config/theme";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${orgTheme.orgName} — Forms`,
  description: orgTheme.orgDescription,
  icons: { icon: orgTheme.faviconUrl },
};

// Build CSS variable string from theme colors
function buildCSSVariables(): string {
  const colorMap: Record<string, string> = {
    "--color-primary": orgTheme.colors.primary,
    "--color-primary-hover": orgTheme.colors.primaryHover,
    "--color-primary-light": orgTheme.colors.primaryLight,
    "--color-secondary": orgTheme.colors.secondary,
    "--color-secondary-hover": orgTheme.colors.secondaryHover,
    "--color-secondary-light": orgTheme.colors.secondaryLight,
    "--color-accent": orgTheme.colors.accent,
    "--color-accent-light": orgTheme.colors.accentLight,
    "--color-background": orgTheme.colors.background,
    "--color-surface": orgTheme.colors.surface,
    "--color-surface-hover": orgTheme.colors.surfaceHover,
    "--color-text": orgTheme.colors.text,
    "--color-text-muted": orgTheme.colors.textMuted,
    "--color-text-inverse": orgTheme.colors.textInverse,
    "--color-success": orgTheme.colors.success,
    "--color-success-light": orgTheme.colors.successLight,
    "--color-warning": orgTheme.colors.warning,
    "--color-warning-light": orgTheme.colors.warningLight,
    "--color-error": orgTheme.colors.error,
    "--color-error-light": orgTheme.colors.errorLight,
    "--color-border": orgTheme.colors.border,
    "--color-border-light": orgTheme.colors.borderLight,
    "--color-shadow": orgTheme.colors.shadow,
    "--color-shadow-dark": orgTheme.colors.shadowDark,
    "--color-dark-bg": orgTheme.colors.darkBg,
    "--color-dark-surface": orgTheme.colors.darkSurface,
    "--color-dark-surface-hover": orgTheme.colors.darkSurfaceHover,
    "--color-dark-border": orgTheme.colors.darkBorder,
    "--color-dark-text": orgTheme.colors.darkText,
    "--color-dark-text-muted": orgTheme.colors.darkTextMuted,
  };

  return Object.entries(colorMap)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable}`}
      style={{ cssText: buildCSSVariables() } as React.CSSProperties}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
