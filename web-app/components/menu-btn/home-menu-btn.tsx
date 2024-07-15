"use client";

import Link from "next/link";

import { usePostHog } from "posthog-js/react";

import Icon from "@/components/icon";

export default function HomeMenuBtn() {
  const posthog = usePostHog();
  return (
    <Link
      href="/"
      onClick={() => {
        posthog.capture("Menu button clicked", { $type: "Home" });
      }}
    >
      <Icon iconLabel="home" />
    </Link>
  );
}
