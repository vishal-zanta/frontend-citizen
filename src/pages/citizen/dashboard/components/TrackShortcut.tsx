import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrackShortcutProps {
  t: (en: string, hi: string) => string;
}

export default function TrackShortcut({ t }: TrackShortcutProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-foreground text-sm sm:text-base">
          {t(
            "Want to check your complaint status?",
            "अपनी शिकायत की स्थिति जांचना चाहते हैं?"
          )}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {t(
            "Enter your Complaint ID on the Track page to view full timeline & status.",
            "पूरी समयरेखा और स्थिति देखने के लिए ट्रैक पृष्ठ पर अपनी शिकायत आईडी दर्ज करें।"
          )}
        </p>
      </div>
      <Link to="/citizen/track" className="self-start sm:self-auto shrink-0">
        <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
          <Search className="w-4 h-4 mr-1" />{" "}
          {t("Track Complaint", "शिकायत ट्रैक करें")}
        </Button>
      </Link>
    </div>
  );
}
