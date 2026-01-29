"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { Info, RotateCcw } from "lucide-react";

type Pull = {
  reason: string;
  avatarSeed: string;
  pulledAt: number;
};

type Status = "idle" | "pulling" | "ready" | "error";

async function fetchReason(): Promise<string> {
  const res = await fetch("/api/no", { cache: "no-store" });
  const data = (await res.json()) as { reason?: string; error?: string };

  if (!res.ok || !data.reason) {
    throw new Error(data.error || "Failed to fetch reason");
  }
  return data.reason;
}

function buildAvatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=transparent&randomizeIds=true`;
}

function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Avatar failed to load"));
    img.src = src;
  });
}

const revealMeta: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", transform: "translateY(6px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transform: "translateY(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Nope() {
  const [pull, setPull] = useState<Pull | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const didAutoPull = useRef(false);

  const avatarUrl = useMemo(() => {
    if (!pull) return null;
    return buildAvatarUrl(pull.avatarSeed);
  }, [pull]);

  async function runPull() {
    setStatus("pulling");
    setError(null);
    setPull(null);

    try {
      const avatarSeed = crypto.randomUUID();
      const url = buildAvatarUrl(avatarSeed);

      const [reason] = await Promise.all([fetchReason(), preloadImage(url)]);

      setPull({
        reason,
        avatarSeed,
        pulledAt: Date.now(),
      });

      setStatus("ready");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message ?? "Something went wrong");
    }
  }

  useEffect(() => {
    if (didAutoPull.current) return;
    didAutoPull.current = true;
    runPull();
  }, []);

  const isLoading = status === "pulling" || status === "idle";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center">
      {/* Face */}
      <div className="">
        {avatarUrl && status === "ready" ? (
          <motion.img
            key={pull?.avatarSeed}
            src={avatarUrl}
            alt="Random face"
            className="pointer-events-none size-32 select-none"
            draggable={false}
            variants={revealMeta}
            initial="hidden"
            animate="show"
          />
        ) : (
          <div className="hidden size-32 animate-pulse rounded-lg bg-black/5" />
        )}
      </div>

      {/* Reason */}
      <div className="mt-6 text-center">
        {pull && status === "ready" ? (
          <motion.p
            key={pull.avatarSeed + pull.pulledAt}
            className={cn("max-w-2xl text-5xl leading-[115%] tracking-[-2.5%]")}
            variants={revealMeta}
            initial="hidden"
            animate="show"
          >
            {pull.reason}
          </motion.p>
        ) : (
          <p
            className={cn("max-w-2xl text-5xl leading-[115%] tracking-[-2.5%]")}
          >
            {isLoading ? "Hmm..." : "..."}
          </p>
        )}

        <motion.p
          key={pull?.pulledAt ?? "time"}
          className="text-muted-foreground/80 mt-4 text-base font-medium"
          variants={revealMeta}
          initial="hidden"
          animate={pull && status === "ready" ? "show" : "hidden"}
        >
          {pull && status === "ready"
            ? new Date(pull.pulledAt).toLocaleString()
            : ""}
        </motion.p>

        {status === "error" && (
          <p className="text-destructive mt-3 text-sm">{error}</p>
        )}
      </div>

      <Button
        size={"icon-sm"}
        onClick={runPull}
        disabled={isLoading}
        className="absolute right-0 top-0 m-4 hover:scale-[1.05] active:scale-[1]"
        variant={"secondary"}
      >
        <RotateCcw />
      </Button>
    </div>
  );
}
