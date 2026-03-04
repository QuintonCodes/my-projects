'use client'

import * as React from 'react'
import { Sidebar } from '@/components/sidebar'
import { AchievementCard } from '@/components/achievement-card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, Star, Zap, Target, Award, TrendingUp } from 'lucide-react'

export default function AchievementsPage() {
  const userLevel = 12
  const currentXP = 850
  const nextLevelXP = 1000
  const xpProgress = (currentXP / nextLevelXP) * 100

  const stats = [
    { label: 'Total Achievements', value: '24', icon: Trophy },
    { label: 'Points Earned', value: '3,450', icon: Star },
    { label: 'Current Streak', value: '7 days', icon: Zap },
    { label: 'Next Milestone', value: '150 XP', icon: Target },
  ]

  const unlockedAchievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Create your first playlist',
      icon: '🎵',
      xp: 50,
      rarity: 'common',
      unlockedDate: '2024-01-15',
      category: 'playlists',
    },
    {
      id: 2,
      title: 'Music Explorer',
      description: 'Listen to 100 different artists',
      icon: '🧭',
      xp: 100,
      rarity: 'rare',
      unlockedDate: '2024-02-20',
      category: 'listening',
    },
    {
      id: 3,
      title: 'Playlist Master',
      description: 'Create 10 playlists',
      icon: '👑',
      xp: 200,
      rarity: 'epic',
      unlockedDate: '2024-03-01',
      category: 'playlists',
    },
    {
      id: 4,
      title: 'Night Owl',
      description: 'Listen to music past midnight for 7 days',
      icon: '🦉',
      xp: 150,
      rarity: 'rare',
      unlockedDate: '2024-03-10',
      category: 'listening',
    },
    {
      id: 5,
      title: 'Social Butterfly',
      description: 'Share 50 songs with friends',
      icon: '🦋',
      xp: 100,
      rarity: 'rare',
      unlockedDate: '2024-03-12',
      category: 'social',
    },
  ]

  const lockedAchievements = [
    {
      id: 6,
      title: 'Legendary Curator',
      description: 'Create 50 playlists',
      icon: '🏆',
      xp: 500,
      rarity: 'legendary',
      progress: 10,
      total: 50,
      category: 'playlists',
    },
    {
      id: 7,
      title: 'Marathon Listener',
      description: 'Listen to music for 1000 hours',
      icon: '⚡',
      xp: 300,
      rarity: 'epic',
      progress: 156,
      total: 1000,
      category: 'listening',
    },
    {
      id: 8,
      title: 'Genre Hopper',
      description: 'Listen to songs from 20 different genres',
      icon: '🎭',
      xp: 150,
      rarity: 'rare',
      progress: 12,
      total: 20,
      category: 'discovery',
    },
    {
      id: 9,
      title: 'Daily Devotee',
      description: 'Listen to music every day for 30 days',
      icon: '📅',
      xp: 250,
      rarity: 'epic',
      progress: 7,
      total: 30,
      category: 'listening',
    },
  ]

  const milestones = [
    { level: 5, reward: 'Custom Profile Badge', unlocked: true },
    { level: 10, reward: 'Exclusive Theme Colors', unlocked: true },
    { level: 15, reward: 'Priority Artist Discovery', unlocked: false },
    { level: 20, reward: 'Advanced Analytics', unlocked: false },
    { level: 25, reward: 'VIP Status', unlocked: false },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[320px] p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header with Level Progress */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-start gap-6">
              <div className="glass-dark rounded-2xl p-8 flex items-center justify-center">
                <Trophy className="h-16 w-16 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-5xl font-bold mb-2 text-balance text-foreground">
                    Level {userLevel}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Keep going to unlock more rewards
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {currentXP} / {nextLevelXP} XP
                    </span>
                    <span className="text-muted-foreground">
                      {nextLevelXP - currentXP} XP to Level {userLevel + 1}
                    </span>
                  </div>
                  <Progress value={xpProgress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-dark rounded-xl p-4 flex items-center gap-3"
                    >
                      <stat.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground truncate">
                          {stat.label}
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="glass mb-6">
              <TabsTrigger value="all">All Achievements</TabsTrigger>
              <TabsTrigger value="unlocked">
                Unlocked ({unlockedAchievements.length})
              </TabsTrigger>
              <TabsTrigger value="locked">
                Locked ({lockedAchievements.length})
              </TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Unlocked
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unlockedAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      {...achievement}
                      isLocked={false}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  In Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lockedAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      {...achievement}
                      isLocked={true}
                    />
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="unlocked">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    {...achievement}
                    isLocked={false}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="locked">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    {...achievement}
                    isLocked={true}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="milestones">
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.level}
                    className={`glass-card rounded-2xl p-6 flex items-center gap-6 ${
                      !milestone.unlocked && 'opacity-60'
                    }`}
                  >
                    <div
                      className={`glass-dark rounded-xl p-4 flex items-center justify-center ${
                        milestone.unlocked
                          ? 'bg-primary/20'
                          : 'bg-muted/20'
                      }`}
                    >
                      <Award
                        className={`h-8 w-8 ${
                          milestone.unlocked
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-foreground">
                          Level {milestone.level}
                        </h3>
                        {milestone.unlocked && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {milestone.reward}
                      </p>
                    </div>
                    {milestone.unlocked ? (
                      <div className="text-primary">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">
                        {milestone.level - userLevel} levels away
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
