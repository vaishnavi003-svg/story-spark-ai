import {
  Accessibility,
  Bug,
  Code2,
  GitPullRequestArrow,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type GuidelineSection = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

const guidelineSections: GuidelineSection[] = [
  {
    title: "Community Values",
    description:
      "StorySparkAI is an open-source creative space for writers, builders, and AI enthusiasts to learn, inspire, and create together.",
    icon: Sparkles,
    points: [
      "Welcome contributions of every size and experience level.",
      "Focus on what helps the overall community and product.",
      "Give credit when building on another person's ideas, prompts, or work.",
    ],
  },
  {
    title: "Respectful Communication",
    description:
      "Keep every discussion constructive, patient, and professional across issues, pull requests, reviews, and community spaces.",
    icon: MessageCircle,
    points: [
      "Use empathetic language and respect different viewpoints.",
      "Offer actionable feedback without personal criticism.",
      "Avoid spam, harassment, private information sharing, and hostile behavior.",
    ],
  },
  {
    title: "Contribution Workflow",
    description:
      "Follow the documented fork, branch, commit, and pull request process so maintainers can review changes smoothly.",
    icon: GitPullRequestArrow,
    points: [
      "Fork the repository, clone your fork, and add the upstream remote.",
      "Pull from upstream main before starting new work.",
      "Create a focused feature branch for each issue or improvement.",
    ],
  },
  {
    title: "Pull Request & Issue Guidelines",
    description:
      "Issues and PRs should be easy for maintainers to understand, reproduce, and review.",
    icon: Lightbulb,
    points: [
      "Open or claim an issue before starting larger feature work.",
      "Use clear titles, descriptions, screenshots, and relevant context.",
      "Keep pull requests focused on one feature, fix, or improvement.",
    ],
  },
  {
    title: "Code Quality Expectations",
    description:
      "The app should remain maintainable, readable, and consistent with the existing React, TypeScript, and Tailwind patterns.",
    icon: Code2,
    points: [
      "Self-review your code before requesting review.",
      "Comment only where the implementation is hard to understand.",
      "Preserve existing routing, component boundaries, and design conventions.",
    ],
  },
  {
    title: "Accessibility & Inclusivity",
    description:
      "The community and product should be usable and welcoming for people with different abilities, backgrounds, and experience levels.",
    icon: Accessibility,
    points: [
      "Use readable text hierarchy, contrast, and keyboard-friendly interactions.",
      "Write inclusive copy and avoid assumptions about contributors.",
      "Report accessibility concerns with enough context to reproduce them.",
    ],
  },
  {
    title: "Reporting Bugs & Feature Requests",
    description:
      "Good reports help contributors move faster and reduce back-and-forth during triage.",
    icon: Bug,
    points: [
      "Describe the problem, expected behavior, and actual behavior.",
      "Include steps to reproduce, screenshots, or environment details when useful.",
      "Avoid duplicate or spammy comments while waiting for assignment or review.",
    ],
  },
  {
    title: "Collaboration & Review Etiquette",
    description:
      "Reviews work best when contributors and maintainers treat them as shared problem-solving.",
    icon: HeartHandshake,
    points: [
      "Respond to feedback gracefully and ask clarifying questions when needed.",
      "Accept responsibility for mistakes and update the PR with care.",
      "Respect maintainers' moderation and review decisions.",
    ],
  },
];

const workflowSteps = [
  "Fork the repository and clone your copy.",
  "Create a branch for the issue or feature.",
  "Make focused changes and self-review them.",
  "Commit with a clear message and push your branch.",
  "Open a pull request with context, screenshots, and testing notes.",
];

const Guidelines = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-gradient-to-b dark:from-[#070B18] dark:via-[#081022] dark:to-black dark:text-white">
      <section className="relative overflow-hidden px-6 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pt-32">
        <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px] dark:bg-blue-600/10" />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Community Guidelines
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Build, write, and collaborate with clarity.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              These guidelines bring together the README, contributing guide, and code of conduct so new contributors can understand how to participate in StorySparkAI with confidence.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Open-source creative platform",
              "Respectful contributor community",
              "Focused issues and pull requests",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:shadow-none"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 sm:p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-300">
            <UsersRound className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">Contributor promise</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            No contribution is too small. The project welcomes learners and experienced contributors as long as everyone follows the code of conduct and keeps collaboration constructive.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50 dark:shadow-none sm:p-7">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Before you contribute</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {workflowSteps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-xl bg-slate-100 p-4 dark:bg-white/[0.03]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-700 dark:text-blue-300">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Community standards
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">How we work together</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            Use these sections as a quick onboarding map for communication, issues, pull requests, code quality, accessibility, and review etiquette.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {guidelineSections.map(({ title, description, icon: Icon, points }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-400/40 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-none dark:hover:border-blue-500/30 dark:hover:bg-slate-900/80"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700 transition-transform duration-300 group-hover:scale-105 dark:text-blue-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{description}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-blue-900/30 dark:via-slate-900 dark:to-black dark:shadow-none sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Need help choosing the right next step?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                Start with the README for setup, use the contributing guide for Git and PR steps, and follow the code of conduct in every project interaction.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/ronisarkarexe/story-spark-ai/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-400/60 hover:bg-blue-50 dark:border-white/15 dark:text-white dark:hover:border-blue-400/40 dark:hover:bg-white/5"
              >
                View Issues
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Guidelines;
