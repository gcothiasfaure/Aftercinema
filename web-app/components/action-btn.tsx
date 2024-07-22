"use client";

import Link from "next/link";

import { usePostHog } from "posthog-js/react";
import { Headphones } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ActionBtn() {
  const posthog = usePostHog();

  return (
    <Link
      href="/listen"
      onClick={() => {
        posthog.capture("Action button clicked");
      }}
    >
      <Button size="lg" variant="action">
        Écoute Aftercinema !
        <Headphones
          size={25}
          strokeWidth={2.5}
          absoluteStrokeWidth
          className="ml-2 mb-[2px]"
        />
      </Button>
    </Link>
  );
}
