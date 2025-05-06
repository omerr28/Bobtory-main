"use client"
import React from 'react'
import DashboardHeader from './_components/DashboardHeader'
import UserStoryList from './_components/UserStoryList'
import { Button } from '@nextui-org/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { useState, useEffect } from 'react'

function Dashboard() {
  const { user } = useUser();
  const [hasStories, setHasStories] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStories = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        setIsLoading(true);
        try {
          const stories = await db.select({ id: StoryData.id })
            .from(StoryData)
            .where(eq(StoryData.userEmail, user.primaryEmailAddress.emailAddress))
            .limit(1);
          
          setHasStories(stories.length > 0);
        } catch (error) {
          console.error('Error checking stories:', error);
          setHasStories(false);
        }
        setIsLoading(false);
      }
    };

    if (user) {
      checkUserStories();
    }
  }, [user]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="rounded-lg bg-background/60 p-4 shadow-lg backdrop-blur-sm transition-all sm:p-6">
            <DashboardHeader />
          </div>

          {/* Create Story Button - Mobile */}
          <div className="flex md:hidden">
            <Link href="/create-story" className="w-full">
              <Button
                className="w-full bg-primary font-medium text-white shadow-lg"
                size="lg"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Hikaye Oluştur
              </Button>
            </Link>
          </div>

          <div className="relative rounded-lg bg-background/60 p-4 shadow-lg backdrop-blur-sm transition-all sm:p-6">
            {/* Create Story Button - Desktop */}
            <div className="mb-6 hidden justify-end md:flex">
              <Link href="/create-story">
                <Button
                  className="bg-primary font-medium text-white shadow-lg"
                  size="lg"
                  startContent={<PlusIcon className="h-5 w-5" />}
                >
                  Hikaye Oluştur
                </Button>
              </Link>
            </div>

            {/* Empty State */}
            {!isLoading && !hasStories && (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center dark:border-gray-800 dark:bg-gray-900/50">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Henüz hikayen yok
                </h3>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Hayal gücünü kullanarak kendi hikayeni oluşturmaya başla!
                </p>
                <Link href="/create-story" className="hidden md:block">
                  <Button
                    className="bg-primary font-medium text-white shadow-lg"
                    size="lg"
                    startContent={<PlusIcon className="h-5 w-5" />}
                  >
                    İlk Hikayeni Oluştur
                  </Button>
                </Link>
              </div>
            )}

            {/* Story List */}
            {(hasStories || isLoading) && <UserStoryList />}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard