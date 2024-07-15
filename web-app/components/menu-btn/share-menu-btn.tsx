"use client";

import { useState, useEffect } from "react";

import { usePostHog } from "posthog-js/react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Icon from "@/components/icon";

export default function ShareMenuBtn() {
  const posthog = usePostHog();
  const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!dialogOpen) {
      setShowCopyMessage(false);
    }
  }, [dialogOpen]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showCopyMessage) {
      timeoutId = setTimeout(() => {
        setShowCopyMessage(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showCopyMessage]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        onClick={() => {
          posthog.capture("Menu button clicked", { $type: "Share" });
        }}
      >
        <Icon iconLabel="share" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lien de partage</DialogTitle>
          <DialogDescription>
            Vous pouvez partager{" "}
            <span className="text-black font-bold">Aftercinema</span> via le
            lien ci-dessous !
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://aftercinema.fr/listen"
              readOnly
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText("https://aftercinema.fr/listen");
              setShowCopyMessage(!showCopyMessage);
            }}
          >
            <Copy size={25} strokeWidth={2.5} absoluteStrokeWidth />
          </Button>
          {showCopyMessage && <p className="text-green-600">Copié !</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
