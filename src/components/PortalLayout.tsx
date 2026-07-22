import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Chatbot from "@/components/Chatbot";
import { useProfile } from "@/context/ProfileContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
import { useLanguage } from "@/context/LanguageContext";

interface PortalLayoutProps {
  children: React.ReactNode;
  role?: any;
}

export default function PortalLayout({
  children,
  role = "",
}: PortalLayoutProps) {
  const [dialog, setDialog] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const { profile, setProfile } = useProfile();
  const { t } = useLanguage();

  // console.log({ profile });
  useEffect(() => {
    if (!!profile) {
      if (!profile?.fullName) {
        setDialog(true);
      }
    }
  }, [profile]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        role="citizen"
        open={sidebarOpen}
        onClose={() => {
          if (typeof window !== "undefined" && window.innerWidth < 1024)
            setSidebarOpen(false);
        }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
      {/* <Chatbot role="citizen" /> */}

      <Dialog open={dialog === true} onOpenChange={() => {}}>
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>
              {t("Update Profile", "प्रोफ़ाइल अपडेट करें")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "Please fill in your profile details to proceed.",
                "आगे बढ़ने के लिए कृपया अपनी प्रोफ़ाइल विवरण भरें।",
              )}
            </DialogDescription>
          </DialogHeader>
          <ProfileUpdateForm
            onSuccess={(data) => {
              setProfile(data);
              setDialog(false);
            }}
            initialData={profile}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
