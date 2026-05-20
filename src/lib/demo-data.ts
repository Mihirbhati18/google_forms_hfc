import { Form, Question, ResponseRow, AdminStats } from "@/types";

// ─── Demo Forms ───────────────────────────────────────────

export const demoForms: Form[] = [
  {
    id: "demo-1",
    slug: "join-the-club",
    title: "Join the Happy Folks Club",
    description:
      "Become part of Bengaluru's most vibrant senior citizen community! Fill out this form to register your interest.",
    success_message:
      "🎉 Welcome to the Happy Folks Club family! We'll reach out to you within 24 hours with next steps.",
    is_active: true,
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-03-10T14:30:00Z",
    _response_count: 142,
  },
  {
    id: "demo-mihir",
    slug: "mihir-test",
    title: "Mihir Test Form",
    description: "A quick form to test the platform functionality.",
    success_message: "Thanks for submitting the test form!",
    is_active: true,
    created_at: "2025-05-20T10:00:00Z",
    updated_at: "2025-05-20T10:00:00Z",
    _response_count: 0,
  },
  {
    id: "demo-2",
    slug: "summit-registration",
    title: "HFC Summit 2025 Registration",
    description:
      "Register for our annual summit — a day of inspiration, connection, and celebration for all ages.",
    success_message:
      "🎊 You're registered for HFC Summit 2025! Check your email for your ticket and event details.",
    is_active: true,
    opens_at: "2025-04-01T00:00:00Z",
    closes_at: "2025-06-15T23:59:59Z",
    max_responses: 500,
    created_at: "2025-03-01T08:00:00Z",
    _response_count: 287,
  },
  {
    id: "demo-3",
    slug: "internship-application",
    title: "Internship Application",
    description:
      "Apply for an internship at Happy Folks Club. Help us build a more inclusive, intergenerational world.",
    success_message:
      "✅ Your application has been submitted! Our team will review it and get back to you within 7 days.",
    is_active: true,
    created_at: "2025-02-20T12:00:00Z",
    _response_count: 56,
  },
  {
    id: "demo-4",
    slug: "dosti-program",
    title: "Dosti Program Signup",
    description:
      "The Dosti Program pairs young volunteers with senior citizens for weekly companionship visits.",
    success_message:
      "💛 Thank you for signing up for the Dosti Program! You're about to make someone's week brighter.",
    is_active: true,
    created_at: "2025-01-10T09:00:00Z",
    _response_count: 89,
  },
  {
    id: "demo-5",
    slug: "swatantra-enrollment",
    title: "Swatantra Program Enrollment",
    description:
      "Enroll in our Swatantra digital literacy program. Learn to use smartphones, the internet, and digital payments with ease.",
    success_message:
      "📱 You're enrolled in Swatantra! Classes begin next Monday. We'll send you the schedule via WhatsApp.",
    is_active: false,
    created_at: "2024-11-05T11:00:00Z",
    _response_count: 34,
  },
];

// ─── Demo Questions (for "Join the Club" form) ───────────

export const demoQuestions: Record<string, Question[]> = {
  "demo-1": [
    {
      id: "q1",
      form_id: "demo-1",
      type: "section_header",
      label: "Personal Information",
      help_text: "Tell us a bit about yourself",
      required: false,
      order_index: 0,
    },
    {
      id: "q2",
      form_id: "demo-1",
      type: "short_text",
      label: "Full Name",
      help_text: "As it appears on your ID",
      required: true,
      order_index: 1,
    },
    {
      id: "q3",
      form_id: "demo-1",
      type: "short_text",
      label: "Email Address",
      required: true,
      order_index: 2,
    },
    {
      id: "q4",
      form_id: "demo-1",
      type: "phone",
      label: "Phone Number",
      help_text: "We'll use this to contact you via WhatsApp",
      required: true,
      order_index: 3,
    },
    {
      id: "q5",
      form_id: "demo-1",
      type: "date",
      label: "Date of Birth",
      required: true,
      order_index: 4,
    },
    {
      id: "q6",
      form_id: "demo-1",
      type: "section_header",
      label: "Your Interests",
      help_text: "Help us match you with the right programs",
      required: false,
      order_index: 5,
    },
    {
      id: "q7",
      form_id: "demo-1",
      type: "multiple_choice",
      label: "How did you hear about Happy Folks Club?",
      options: [
        "Social Media",
        "Friend or Family",
        "Newspaper",
        "Website",
        "Event",
        "Other",
      ],
      required: true,
      order_index: 6,
    },
    {
      id: "q8",
      form_id: "demo-1",
      type: "checkboxes",
      label: "Which programs interest you?",
      help_text: "Select all that apply",
      options: [
        "Dosti (Companionship)",
        "Swatantra (Digital Literacy)",
        "Pragathi (Career Mentorship)",
        "Community Events",
        "Fitness & Wellness",
        "Art & Culture",
      ],
      required: false,
      order_index: 7,
    },
    {
      id: "q9",
      form_id: "demo-1",
      type: "dropdown",
      label: "Preferred Location",
      options: [
        "Indiranagar",
        "Koramangala",
        "Jayanagar",
        "Whitefield",
        "HSR Layout",
        "JP Nagar",
        "Malleshwaram",
        "Other",
      ],
      required: true,
      order_index: 8,
    },
    {
      id: "q10",
      form_id: "demo-1",
      type: "rating",
      label: "How excited are you to join?",
      help_text: "Rate from 1 to 5 stars",
      required: false,
      order_index: 9,
    },
    {
      id: "q11",
      form_id: "demo-1",
      type: "long_text",
      label: "Anything else you'd like us to know?",
      help_text: "Share your story, expectations, or questions",
      required: false,
      order_index: 10,
    },
  ],
  "demo-mihir": [
    {
      id: "mq1",
      form_id: "demo-mihir",
      type: "short_text",
      label: "Age",
      required: true,
      order_index: 0,
    },
    {
      id: "mq2",
      form_id: "demo-mihir",
      type: "short_text",
      label: "Name",
      required: true,
      order_index: 1,
    },
    {
      id: "mq3",
      form_id: "demo-mihir",
      type: "long_text",
      label: "Why Mihir is best",
      required: true,
      order_index: 2,
    },
    {
      id: "mq4",
      form_id: "demo-mihir",
      type: "short_text",
      label: "Who are you",
      required: true,
      order_index: 3,
    },
    {
      id: "mq5",
      form_id: "demo-mihir",
      type: "multiple_choice",
      label: "What is my hobbies",
      options: ["Coding", "Reading", "Gaming", "Other"],
      required: true,
      order_index: 4,
    },
  ],
  "demo-2": [
    {
      id: "s1",
      form_id: "demo-2",
      type: "short_text",
      label: "Full Name",
      required: true,
      order_index: 0,
    },
    {
      id: "s2",
      form_id: "demo-2",
      type: "short_text",
      label: "Email Address",
      required: true,
      order_index: 1,
    },
    {
      id: "s3",
      form_id: "demo-2",
      type: "phone",
      label: "Phone Number",
      required: true,
      order_index: 2,
    },
    {
      id: "s4",
      form_id: "demo-2",
      type: "multiple_choice",
      label: "Are you a senior citizen or a young volunteer?",
      options: ["Senior Citizen (60+)", "Young Volunteer (18-35)", "Family Member", "Other"],
      required: true,
      order_index: 3,
    },
    {
      id: "s5",
      form_id: "demo-2",
      type: "dropdown",
      label: "T-shirt Size",
      options: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
      order_index: 4,
    },
    {
      id: "s6",
      form_id: "demo-2",
      type: "checkboxes",
      label: "Which sessions interest you?",
      options: [
        "Keynote: Intergenerational Living",
        "Workshop: Digital Literacy",
        "Panel: Active Aging",
        "Networking Lunch",
        "Cultural Performance",
      ],
      required: false,
      order_index: 5,
    },
    {
      id: "s7",
      form_id: "demo-2",
      type: "long_text",
      label: "Dietary restrictions or accessibility needs",
      required: false,
      order_index: 6,
    },
  ],
  "demo-3": [
    {
      id: "i1",
      form_id: "demo-3",
      type: "short_text",
      label: "Full Name",
      required: true,
      order_index: 0,
    },
    {
      id: "i2",
      form_id: "demo-3",
      type: "short_text",
      label: "Email Address",
      required: true,
      order_index: 1,
    },
    {
      id: "i3",
      form_id: "demo-3",
      type: "short_text",
      label: "College / University",
      required: true,
      order_index: 2,
    },
    {
      id: "i4",
      form_id: "demo-3",
      type: "dropdown",
      label: "Preferred Department",
      options: ["Marketing", "Events", "Tech", "Content", "Operations", "Community Outreach"],
      required: true,
      order_index: 3,
    },
    {
      id: "i5",
      form_id: "demo-3",
      type: "long_text",
      label: "Why do you want to intern at HFC?",
      help_text: "Tell us about your motivation and what you hope to learn",
      required: true,
      order_index: 4,
    },
    {
      id: "i6",
      form_id: "demo-3",
      type: "file_upload",
      label: "Upload your resume",
      help_text: "PDF or DOC, max 5MB",
      required: true,
      order_index: 5,
    },
  ],
  "demo-4": [
    {
      id: "d1",
      form_id: "demo-4",
      type: "short_text",
      label: "Full Name",
      required: true,
      order_index: 0,
    },
    {
      id: "d2",
      form_id: "demo-4",
      type: "phone",
      label: "Phone Number",
      required: true,
      order_index: 1,
    },
    {
      id: "d3",
      form_id: "demo-4",
      type: "multiple_choice",
      label: "I am signing up as",
      options: ["Senior Citizen looking for a friend", "Young Volunteer wanting to give time"],
      required: true,
      order_index: 2,
    },
    {
      id: "d4",
      form_id: "demo-4",
      type: "checkboxes",
      label: "Preferred activities during visits",
      options: ["Conversation", "Board Games", "Walk / Exercise", "Technology Help", "Reading Together", "Cooking"],
      required: false,
      order_index: 3,
    },
    {
      id: "d5",
      form_id: "demo-4",
      type: "dropdown",
      label: "Preferred day of the week",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Flexible"],
      required: true,
      order_index: 4,
    },
  ],
  "demo-5": [
    {
      id: "sw1",
      form_id: "demo-5",
      type: "short_text",
      label: "Full Name",
      required: true,
      order_index: 0,
    },
    {
      id: "sw2",
      form_id: "demo-5",
      type: "phone",
      label: "Phone Number",
      required: true,
      order_index: 1,
    },
    {
      id: "sw3",
      form_id: "demo-5",
      type: "multiple_choice",
      label: "Current comfort level with technology",
      options: ["Complete beginner", "Can make calls & texts", "Can use WhatsApp", "Comfortable with apps", "Tech-savvy"],
      required: true,
      order_index: 2,
    },
    {
      id: "sw4",
      form_id: "demo-5",
      type: "checkboxes",
      label: "What do you want to learn?",
      options: ["Smartphone basics", "WhatsApp", "Video calling", "UPI / Digital payments", "Email", "Social media", "Online shopping"],
      required: true,
      order_index: 3,
    },
  ],
};

// ─── Demo Responses ───────────────────────────────────────

export const demoResponses: Record<string, ResponseRow[]> = {
  "demo-1": [
    {
      id: "r1",
      submitted_at: "2025-05-20T09:30:00Z",
      answers: {
        q2: "Lakshmi Devi",
        q3: "lakshmi@example.com",
        q4: "+91 9876543210",
        q5: "1958-03-15",
        q7: "Friend or Family",
        q8: ["Dosti (Companionship)", "Community Events", "Art & Culture"],
        q9: "Jayanagar",
        q10: 5,
        q11: "I've been looking for a community like this for years! So excited to join.",
      },
    },
    {
      id: "r2",
      submitted_at: "2025-05-19T14:15:00Z",
      answers: {
        q2: "Ramesh Gupta",
        q3: "ramesh.g@example.com",
        q4: "+91 8765432109",
        q5: "1955-07-22",
        q7: "Newspaper",
        q8: ["Swatantra (Digital Literacy)", "Fitness & Wellness"],
        q9: "Koramangala",
        q10: 4,
        q11: "I want to learn to use my new smartphone properly.",
      },
    },
    {
      id: "r3",
      submitted_at: "2025-05-18T11:45:00Z",
      answers: {
        q2: "Meera Krishnan",
        q3: "meera.k@example.com",
        q4: "+91 7654321098",
        q5: "1962-11-08",
        q7: "Social Media",
        q8: ["Community Events", "Fitness & Wellness", "Art & Culture"],
        q9: "Indiranagar",
        q10: 5,
        q11: "",
      },
    },
    {
      id: "r4",
      submitted_at: "2025-05-17T16:20:00Z",
      answers: {
        q2: "Suresh Bhat",
        q3: "suresh.bhat@example.com",
        q4: "+91 6543210987",
        q5: "1950-01-30",
        q7: "Event",
        q8: ["Pragathi (Career Mentorship)", "Community Events"],
        q9: "Malleshwaram",
        q10: 3,
        q11: "I'd love to mentor young professionals in engineering.",
      },
    },
    {
      id: "r5",
      submitted_at: "2025-05-16T10:00:00Z",
      answers: {
        q2: "Anita Sharma",
        q3: "anita.s@example.com",
        q4: "+91 5432109876",
        q5: "1960-06-12",
        q7: "Website",
        q8: ["Dosti (Companionship)", "Art & Culture"],
        q9: "HSR Layout",
        q10: 4,
        q11: "Looking forward to making new friends!",
      },
    },
  ],
};

// ─── Demo Admin Stats ─────────────────────────────────────

export const demoStats: AdminStats = {
  totalForms: 5,
  totalResponses: 608,
  responsesToday: 12,
  responsesThisWeek: 47,
  mostActiveForm: {
    title: "HFC Summit 2025 Registration",
    responseCount: 287,
  },
};

// ─── Helper: Get form by slug ─────────────────────────────

export function getDemoFormBySlug(slug: string): Form | undefined {
  return demoForms.find((f) => f.slug === slug);
}

export function getDemoFormById(id: string): Form | undefined {
  return demoForms.find((f) => f.id === id);
}

export function getDemoQuestions(formId: string): Question[] {
  return demoQuestions[formId] || [];
}

export function getDemoResponses(formId: string): ResponseRow[] {
  return demoResponses[formId] || [];
}
