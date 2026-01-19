"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Music } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface SpotifyLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SpotifyLoginModal({
  open,
  onOpenChange,
}: SpotifyLoginModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSpotifyLogin = () => {
    setIsLoading(true);

    // Simulate OAuth flow
    toast.info("Redirecting to Spotify...");

    // In a real implementation, this would redirect to:
    // https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-private+user-read-email+playlist-read-private+playlist-modify-public+playlist-modify-private

    setTimeout(() => {
      // Simulate successful login
      localStorage.setItem(
        "spotify_user",
        JSON.stringify({
          name: "Music Lover",
          email: "user@example.com",
          imageUrl: "/placeholder.svg?height=100&width=100",
          spotifyId: "user123",
        })
      );

      setIsLoading(false);
      toast.success("Successfully logged in!");
      onOpenChange(false);

      // Reload to update auth state
      window.location.reload();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass backdrop-blur-xl sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="glass-dark rounded-full p-6">
              <Music className="h-12 w-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Connect to Spotify
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Sign in with your Spotify account to sync your playlists, discover
            new music, and unlock all features of Chordify.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Button
            onClick={handleSpotifyLogin}
            disabled={isLoading}
            className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white gap-2 h-12 text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Music className="h-5 w-5" />
                Continue with Spotify
              </>
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            By continuing, you agree to grant Chordify access to your Spotify
            account data including playlists, listening history, and user
            profile.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
