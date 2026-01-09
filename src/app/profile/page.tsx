"use client";

import { useEffect } from "react";
import { usePi } from "@/components/pi/pi-provider";
import { useRouter } from "next/navigation";

export default function ProfileRedirectPage() {
  const { user, isInitialized } = usePi();
  const router = useRouter();

  useEffect(() => {
    // Wait for the SDK to initialize and check for a user
    if (isInitialized) {
      if (user?.username) {
        // If user is found, redirect to their dynamic profile page
        router.replace(`/app/profile/${user.username}`);
      }
      // If no user, we can just show a message or redirect to login.
      // For now, we'll just show a loading/message state.
    }
  }, [user, isInitialized, router]);

  // Display a loading state while we wait for the redirect logic
  return (
    <div className="h-full flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <p className="mt-4 text-center">Checking authentication...</p>
       <p className="mt-2 text-sm text-gray-500">If you are not redirected, please log in.</p>
    </div>
  );
}
