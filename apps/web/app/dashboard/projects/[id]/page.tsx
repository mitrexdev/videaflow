"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Download, Play, Pause, Volume2, Settings2, FileText, Type, Video, Maximize, Mic } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock data for the UI
  const project = {
    id,
    name: "Cinematic Product Ad",
    status: "ready",
    aspectRatio: "16:9",
    fps: 30,
    duration: "00:15",
  };

  return (
    <div className="flex h-[calc(100svh-1.5rem)] flex-col gap-4 overflow-hidden pt-4 md:pt-6">
      <header className="flex shrink-0 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-surface-strong/50 text-body transition-colors hover:bg-surface-strong hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-ink">{project.name}</h1>
              <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface-strong/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-body shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-semantic-success" />
                {project.status}
              </span>
            </div>
            <p className="text-xs text-body/70">ID: {project.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-9 items-center justify-center rounded-full border border-hairline bg-surface-strong/30 px-4 text-sm font-medium text-ink transition-colors hover:bg-surface-strong">
            <Settings2 className="mr-2 h-4 w-4 text-body" />
            Project Settings
          </button>
          <button className="flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105 hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Video
          </button>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 gap-4 px-6 pb-6">
        {/* Left Column: Canvas & Timeline */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* Canvas */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-card/20 shadow-inner backdrop-blur-md">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            
            {/* Video Player Mockup */}
            <div className="group relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-hairline bg-black shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
              {/* Fake Video Content (Gradient) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-gradient-sky/20" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 p-4 backdrop-blur-xl transition-transform hover:scale-110">
                  <Play className="h-8 w-8 ml-1 text-white" />
                </button>
              </div>

              {/* Player Controls */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-primary"><Play className="h-5 w-5" /></button>
                  <div className="h-1 flex-1 cursor-pointer rounded-full bg-white/20">
                    <div className="h-full w-1/3 rounded-full bg-primary" />
                  </div>
                  <span className="text-xs font-medium text-white font-mono">00:05 / {project.duration}</span>
                  <button className="text-white hover:text-primary"><Volume2 className="h-5 w-5" /></button>
                  <button className="text-white hover:text-primary"><Maximize className="h-5 w-5" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex h-48 shrink-0 flex-col overflow-hidden rounded-2xl border border-hairline bg-card/40 shadow-lg backdrop-blur-xl">
            <div className="flex h-10 items-center border-b border-hairline px-4">
              <span className="text-xs font-medium text-body">Timeline</span>
              <div className="ml-auto flex items-center gap-2 text-xs font-mono text-body/50">
                <span>00:00</span>
                <span>00:05</span>
                <span>00:10</span>
                <span>00:15</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {/* Video Track */}
              <div className="flex h-12 rounded-lg bg-surface-strong/30">
                <div className="flex w-24 shrink-0 items-center justify-center border-r border-hairline bg-surface-strong/50">
                  <Video className="h-4 w-4 text-body" />
                </div>
                <div className="relative flex-1 px-2 py-1.5">
                  <div className="absolute inset-y-1.5 left-2 w-[40%] rounded-md bg-gradient-sky/20 border border-gradient-sky/30" />
                  <div className="absolute inset-y-1.5 left-[42%] w-[50%] rounded-md bg-primary/20 border border-primary/30" />
                </div>
              </div>
              {/* Audio Track */}
              <div className="flex h-10 rounded-lg bg-surface-strong/30">
                <div className="flex w-24 shrink-0 items-center justify-center border-r border-hairline bg-surface-strong/50">
                  <Mic className="h-4 w-4 text-body" />
                </div>
                <div className="relative flex-1 px-2 py-1">
                  <div className="absolute inset-y-1 left-2 w-[92%] rounded-md bg-gradient-mint/10 border border-gradient-mint/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Properties Sidebar */}
        <div className="w-80 shrink-0 overflow-y-auto rounded-2xl border border-hairline bg-card/40 p-5 shadow-lg backdrop-blur-xl">
          <h2 className="mb-6 text-sm font-semibold text-ink flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-body" />
            Properties
          </h2>

          <div className="space-y-6">
            {/* Resolution */}
            <div>
              <label className="text-xs font-medium text-body">Resolution</label>
              <div className="mt-2 flex gap-2">
                <button className="flex-1 rounded-lg border border-primary bg-primary/10 py-2 text-center text-xs font-semibold text-primary transition-colors">
                  16:9
                </button>
                <button className="flex-1 rounded-lg border border-hairline bg-surface-strong/30 py-2 text-center text-xs font-medium text-body transition-colors hover:bg-surface-strong">
                  9:16
                </button>
                <button className="flex-1 rounded-lg border border-hairline bg-surface-strong/30 py-2 text-center text-xs font-medium text-body transition-colors hover:bg-surface-strong">
                  1:1
                </button>
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="text-xs font-medium text-body">Quality</label>
              <select className="mt-2 w-full appearance-none rounded-lg border border-hairline bg-surface-strong/30 px-3 py-2 text-sm text-ink outline-none hover:bg-surface-strong">
                <option>1080p (HD)</option>
                <option>720p (SD)</option>
                <option>4K (UHD)</option>
              </select>
            </div>

            {/* AI Voice */}
            <div>
              <label className="text-xs font-medium text-body">AI Voice</label>
              <div className="mt-2 flex items-center justify-between rounded-lg border border-hairline bg-surface-strong/30 p-3 hover:bg-surface-strong cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Mic className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">Adam</p>
                    <p className="text-[10px] text-body">Deep, Narration</p>
                  </div>
                </div>
                <Play className="h-4 w-4 text-body hover:text-primary" />
              </div>
            </div>

            {/* Script */}
            <div>
              <label className="text-xs font-medium text-body flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" /> Script
              </label>
              <div className="mt-2 rounded-lg border border-hairline bg-surface-strong/30 p-3">
                <p className="text-xs leading-relaxed text-body">
                  "Experience the future of video creation. Our AI pipeline handles scripting, storyboarding, and rendering in minutes. Start free, scale when you're ready."
                </p>
                <button className="mt-3 w-full rounded-md border border-hairline bg-background py-1.5 text-xs font-medium text-ink hover:bg-surface-strong transition-colors">
                  Edit Script
                </button>
              </div>
            </div>
            
            {/* Credits Info */}
            <div className="rounded-xl border border-hairline bg-primary/5 p-4 text-center">
              <p className="text-xs font-medium text-primary">Export Cost</p>
              <p className="mt-1 text-2xl font-semibold text-ink font-heading">25 <span className="text-sm font-normal text-body">credits</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
