import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Captions,
  Clapperboard,
  Download,
  Mic,
  Music2,
  Palette,
  Repeat2,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Sparkles,
    title: "AI script generation",
    description:
      "Type a topic and get a hook-driven, spoken-friendly script — or paste your own and keep full control.",
  },
  {
    icon: Clapperboard,
    title: "Scene & storyboard AI",
    description:
      "Your script is split into scenes with shot types, camera moves and visual prompts — editable before anything generates.",
  },
  {
    icon: Bot,
    title: "AI visuals",
    description:
      "Cinematic images or AI video per scene, consistent in style across the whole video via one style token.",
  },
  {
    icon: Mic,
    title: "Realistic voices",
    description:
      "Pick from premium AI voices or upload your own narration. Every scene is timed to the actual audio.",
  },
  {
    icon: Captions,
    title: "Auto captions",
    description:
      "Word-level subtitles generated from your voiceover, styled on-brand and burned in — perfect for muted feeds.",
  },
  {
    icon: Music2,
    title: "Music & sound",
    description:
      "Background tracks and sound effects from a licensed library, auto-ducked under your voiceover.",
  },
  {
    icon: SlidersHorizontal,
    title: "Beginner-friendly editor",
    description:
      "A scene-based timeline: reorder, trim, regenerate one scene, swap a visual or a voice — no Premiere learning curve.",
  },
  {
    icon: Download,
    title: "One-click export",
    description:
      "Render 16:9, 9:16 and 1:1 in up to 4K, ready for YouTube, Shorts, Reels and TikTok.",
  },
  {
    icon: Repeat2,
    title: "Repurpose everything",
    description:
      "Turn one long video into 5–10 Shorts/Reels with the best moments, fresh captions and vertical formatting.",
  },
];

export interface PipelineStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const pipelineSteps: PipelineStep[] = [
  { icon: Sparkles, title: "Give it an idea", description: "A topic, a pasted script, or a voice memo." },
  { icon: Clapperboard, title: "AI builds the storyboard", description: "Script, scenes, shots and visual prompts." },
  { icon: Bot, title: "Generate visuals & voice", description: "Images or AI video with a matching AI voice." },
  { icon: Captions, title: "Captions & music", description: "Styled subtitles and a licensed soundtrack." },
  { icon: Download, title: "Export everywhere", description: "MP4s for YouTube, Shorts, Reels and TikTok." },
];

export interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  credits: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    description: "Try the full pipeline, no card required.",
    credits: "50 credits / month",
    features: [
      "2 projects",
      "AI script + scene breakdown",
      "Standard voices",
      "720p export with watermark",
      "Community support",
    ],
    cta: "Start for free",
  },
  {
    name: "Creator",
    monthly: 19,
    yearly: 15,
    description: "For growing creators posting weekly.",
    credits: "500 credits / month",
    features: [
      "Unlimited projects",
      "Premium AI voices",
      "1080p exports, no watermark",
      "Background music library",
      "Auto captions + styling",
      "Email support",
    ],
    cta: "Start 7-day trial",
    highlighted: true,
  },
  {
    name: "Pro",
    monthly: 49,
    yearly: 39,
    description: "For creators shipping daily content.",
    credits: "2,000 credits / month",
    features: [
      "Everything in Creator",
      "4K exports",
      "AI video generation",
      "Long-form → Shorts repurposing",
      "Brand kit + custom fonts",
      "Priority support",
    ],
    cta: "Go Pro",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How does Videaflow turn an idea into a video?",
    answer:
      "You give us a topic (or paste your own script). Our AI writes the narration, splits it into scenes, generates visuals and voiceover, adds captions and music, and renders an MP4 — you review and edit every step before anything is final.",
  },
  {
    question: "Do I need any editing experience?",
    answer:
      "No. The scene-based editor is deliberately simple — reorder scenes, trim timing, regenerate one scene at a time. If you want finer control, everything is still editable scene by scene.",
  },
  {
    question: "What are credits and how do they work?",
    answer:
      "Credits are metered per generation — a script costs a few, an image more, a 4K render the most. Your plan includes a monthly allowance and you can top up anytime. Unused credits roll over on paid plans.",
  },
  {
    question: "Can I use my own voice?",
    answer:
      "Yes. Upload a narration and we'll use it, or pick from our premium AI voices. Voice cloning (with recorded consent) is coming soon.",
  },
  {
    question: "Which platforms can I export to?",
    answer:
      "YouTube, YouTube Shorts, Instagram Reels, TikTok and Facebook. Export at 16:9, 9:16, 1:1 or 4:5 in up to 4K, and reuse one project across every format.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Plans are month-to-month — cancel in two clicks and you keep access until the end of your billing period.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I went from script to a finished 60-second Short in under an hour. The scene-by-scene control is what sold me — nothing is locked in.",
    name: "Aisha Rahman",
    role: "YouTuber, 210k subs",
    initials: "AR",
  },
  {
    quote:
      "We repurpose every webinar into 6–8 clips for Instagram. Videaflow cut our content production cost by more than half.",
    name: "Marcus Webb",
    role: "Head of Content, Streamly",
    initials: "MW",
  },
  {
    quote:
      "The captions and vertical export just work. It's the first AI video tool that doesn't make me want to open Premiere to fix it.",
    name: "Priya Sharma",
    role: "Marketing lead & podcaster",
    initials: "PS",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Templates", "AI Voices", "Changelog"],
  },
  {
    title: "Creators",
    links: ["How it works", "Video tutorials", "Community", "Affiliates"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Licenses"],
  },
];

export const stats = [
  { icon: TrendingUp, value: "1.2M+", label: "videos created" },
  { icon: Sparkles, value: "4.9/5", label: "creator rating" },
  { icon: Repeat2, value: "8", label: "platforms supported" },
  { icon: Palette, value: "120+", label: "AI voices" },
];
