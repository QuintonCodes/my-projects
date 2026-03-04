'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Play, Users, Music } from 'lucide-react'

interface DailyArtistCardProps {
  name: string
  genre: string
  followers: string
  imageUrl: string
  bio: string
  topTracks: Array<{ id: number; name: string; plays: string }>
}

export function DailyArtistCard({
  name,
  genre,
  followers,
  imageUrl,
  bio,
  topTracks,
}: DailyArtistCardProps) {
  const handlePlayOnSpotify = () => {
    window.open('https://open.spotify.com', '_blank')
  }

  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Artist Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden group">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            size="lg"
            className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handlePlayOnSpotify}
          >
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>

        {/* Artist Info */}
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Daily Discovery
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2 text-balance">
              {name}
            </h3>
            <p className="text-lg text-muted-foreground">{genre}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">
                {followers} followers
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {bio}
          </p>

          {/* Top Tracks */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Music className="h-4 w-4 text-primary" />
              <span>Top Tracks</span>
            </div>
            <div className="space-y-2">
              {topTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                  onClick={handlePlayOnSpotify}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-4">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {track.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {track.plays}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handlePlayOnSpotify}
          >
            <Play className="h-4 w-4 mr-2" />
            Play on Spotify
          </Button>
        </div>
      </div>
    </div>
  )
}
