// ✏️ Edit this file to rebrand the entire platform
// Change orgName, colors, fonts, images — the whole site reskins automatically.
// No component files need to be touched.

export const orgTheme = {
  // ─── Organisation Identity ──────────────────────────────
  orgName: "Happy Folks Club",
  orgTagline: "Where Age is Just a Number",
  orgDescription:
    "A vibrant intergenerational community empowering senior citizens in Bengaluru. Join us for events, programs, and lifelong friendships.",
  orgWebsite: "https://www.happyfolksclub.com",

  // ─── Logo & Favicon ─────────────────────────────────────
  logoUrl: "/brand/logo.jpeg",
  faviconUrl: "/favicon.ico",

  // ─── Hero Section Images (rolling drum carousel) ────────
  heroImages: [
    { src: "/brand/hero-1.webp", alt: "HFC Summit event" },
    { src: "/brand/hero-2.jpeg", alt: "Swatantra program" },
    { src: "/brand/hero-3.jpg", alt: "Dosti program" },
    { src: "/brand/hero-4.jpg", alt: "Pragathi initiative" },
  ],

  // ─── Floating Background Orbs (decorative) ──────────────
  floatingImages: [
    "/brand/hero-1.webp",
    "/brand/float-1.webp",
    "/brand/hero-3.jpg",
  ],

  // ─── Hero Background ────────────────────────────────────
  heroBackground: "/brand/hero-bg.jpg",

  // ─── Color Palette (injected as CSS custom properties) ──
  colors: {
    primary: "#E85D26",
    primaryHover: "#D14E1C",
    primaryLight: "#FFF0E8",
    secondary: "#6C3FC5",
    secondaryHover: "#5A32A8",
    secondaryLight: "#EDE8FF",
    accent: "#F5A623",
    accentLight: "#FFF8E7",
    background: "#FFFAF5",
    surface: "#FFFFFF",
    surfaceHover: "#FFF5EE",
    text: "#1A1A1A",
    textMuted: "#6B6B6B",
    textInverse: "#FFFFFF",
    success: "#2E7D32",
    successLight: "#E8F5E9",
    warning: "#F57C00",
    warningLight: "#FFF3E0",
    error: "#D32F2F",
    errorLight: "#FFEBEE",
    border: "#E8E0D5",
    borderLight: "#F0EBE3",
    shadow: "rgba(232, 93, 38, 0.08)",
    shadowDark: "rgba(0, 0, 0, 0.12)",
    // Admin dark mode overrides
    darkBg: "#0F0F13",
    darkSurface: "#1A1A23",
    darkSurfaceHover: "#24243A",
    darkBorder: "#2D2D3F",
    darkText: "#E8E8ED",
    darkTextMuted: "#8888A0",
  },

  // ─── Typography ─────────────────────────────────────────
  fonts: {
    heading: "Syne",
    body: "Inter",
    headingWeight: 700,
    bodyWeight: 400,
  },

  // ─── Footer ─────────────────────────────────────────────
  footerText: "© 2025 Happy Folks Club. Built with ❤️ for Bengaluru seniors.",
  poweredByText: "Powered by HFC Forms",

  // ─── Admin Email ────────────────────────────────────────
  adminEmail: "siddharth@isbr.in",

  // ─── Social Links (optional) ────────────────────────────
  socialLinks: {
    instagram: "https://www.instagram.com/happyfolksclub",
    linkedin: "https://www.linkedin.com/company/happyfolksclub",
    website: "https://www.happyfolksclub.com",
  },
} as const;

// Type export for use in components
export type OrgTheme = typeof orgTheme;
export type ThemeColors = typeof orgTheme.colors;
