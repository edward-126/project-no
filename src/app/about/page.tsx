import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project No — Abot",
  description: "About this app and the APIs it uses.",
};

const REPO_URL = "https://github.com/edward-126/project-no";
const REPO_ISSUES_URL = "https://github.com/edward-126/project-no/issues";

function ApiCard({
  title,
  href,
  children,
  icon,
}: {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card text-card-foreground w-full rounded-xl border p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-muted-foreground">{icon}</span> : null}
          <h2 className="text-xl font-medium leading-tight tracking-[-1%]">
            {title}
          </h2>
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
            aria-label={`Open ${title}`}
          >
            <span className="hidden sm:inline">Open</span>
            <ExternalLink className="size-4" />
          </a>
        ) : null}
      </div>

      <div className="text-muted-foreground mt-3 space-y-2 text-base leading-[150%]">
        {children}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main
      className={cn(
        "bg-background flex min-h-dvh items-center justify-center px-4 py-24",
        inter.className
      )}
    >
      <div className="mx-auto flex w-full max-w-lg flex-col items-center">
        {/* Top bar */}
        <div className="flex w-full items-center justify-between">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hover:scale-[1.05] active:scale-[1]"
          >
            <Link href="/" className="gap-1">
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Title */}
        <div className="mt-8 w-full">
          <h1 className="text-4xl font-semibold leading-[115%] tracking-[-2.5%]">
            About this app
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            This site generates a random “nope” reason and a matching face.
            Here's what powers it behind the scenes.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 flex w-full flex-col gap-4">
          <ApiCard
            title="Open source"
            href={""}
            icon={<Github className="size-4" />}
          >
            <p>The full source code is available on GitHub.</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-foreground flex items-center gap-1.5 hover:underline"
              >
                View repository <ExternalLink className="size-4" />
              </a>
            </p>
          </ApiCard>
          <ApiCard title="Internal API: /api/no">
            <p>
              The app calls <span className="text-foreground">/api/no</span> to
              fetch a fresh reason. The route disables caching (
              <span className="text-foreground">no-store</span>) and responds
              with JSON like{" "}
              <span className="text-foreground">{`{ reason: string }`}</span>.
            </p>
            <p>
              If the upstream service fails, the route returns a clear error
              status (typically 502 for upstream issues, 500 for fetch
              failures).
            </p>
          </ApiCard>
          <ApiCard
            title="Upstream reasons: No as a Service"
            href="https://github.com/hotheadhacker/no-as-a-service"
          >
            <p>
              Reasons come from the “No as a Service” endpoint{" "}
              <span className="text-foreground">
                https://naas.isalman.dev/no
              </span>{" "}
              which returns{" "}
              <span className="text-foreground">application/json</span>{" "}
              containing a <span className="text-foreground">reason</span>.
            </p>
            <p>
              The site uses a server-side proxy so the browser doesn't need to
              call the upstream API directly.
            </p>
          </ApiCard>
          <ApiCard
            title="Avatar generator: DiceBear (notionists-neutral)"
            href="https://www.dicebear.com/styles/notionists-neutral/"
          >
            <p>
              A random seed is generated for each pull, and the avatar SVG is
              fetched from DiceBear. The avatar is preloaded before revealing
              the reason, so the “face + text” appears together.
            </p>
            <p>
              URL pattern:{" "}
              <span className="text-foreground break-all">
                api.dicebear.com/9.x/notionists-neutral/svg?seed=...
              </span>
            </p>
          </ApiCard>
          <p className="text-muted-foreground/80 mt-1 text-sm leading-relaxed">
            Designed and developed by{" "}
            <Link
              href="https://thilina.dev/"
              target="_blank"
              className="text-primary font-medium"
            >
              Thilina R.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
