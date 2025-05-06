"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@nextui-org/button'
import { Card } from "@nextui-org/card"
import { Progress } from "@nextui-org/progress"
import { ChevronLeft, ChevronRight, Bookmark, Home } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import Image from 'next/image'
import Link from 'next/link'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

function ViewStory({ params }) {
  const [story, setStory] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    getStory()
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage])

  // Check if we're on the last page
  useEffect(() => {
    if (story?.output?.chapters && currentPage === story.output.chapters.length) {
      setShowConfetti(true)
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [currentPage, story])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  const getStory = async () => {
    try {
      setIsLoading(true)
      const result = await db.select().from(StoryData)
        .where(eq(StoryData.storyId, params.id))
      setStory(result[0])
    } catch (error) {
      console.error('Error fetching story:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const paginate = (newDirection) => {
    if (
      (currentPage === 0 && newDirection === -1) ||
      (currentPage === (story?.output?.chapters?.length + 1) && newDirection === 1)
    ) return
    
    setDirection(newDirection)
    setCurrentPage(currentPage + newDirection)
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!story?.output?.chapters?.length) return 0
    return Math.min(((currentPage) / (story.output.chapters.length)) * 100, 100)
  }

  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45
    })
  }

  const renderCoverPage = () => (
    <div className="relative w-full h-full flex flex-col">
      {/* Cover Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {story?.coverImage && (
          <Image
            src={story.coverImage}
            alt="Story Cover"
            fill
            priority
            className="object-cover"
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-end p-6 md:p-8 text-white z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {story?.output?.story_cover?.title}
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Hikayenizi okumaya başlayın
          </p>
          <Button 
            onClick={() => paginate(1)}
            size="lg"
            className="mt-6 bg-white/90 backdrop-blur-sm text-black hover:bg-white 
              transition-all duration-300 font-semibold text-lg px-8 py-6"
          >
            Okumaya başla
          </Button>
        </motion.div>
      </div>
    </div>
  )

  const renderLastPage = () => (
    <div className="h-full flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Tebrikler! Hikayeyi bitirdiniz!
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
          Harika bir yolculuktu! Başka hikayeler keşfetmeye ne dersiniz?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-primary text-white shadow-lg"
              startContent={<Home className="w-5 h-5" />}
            >
              Hikayelerim
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )

  const renderChapterPage = (chapter) => (
    <div className="h-full overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
            {chapter?.chapter_title}
          </h2>
          <Button
            isIconOnly
            variant="light"
            onClick={() => {/* Add bookmark functionality */}}
          >
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
            {chapter?.chapter_text}
          </p>
        </div>

        {/* Show "Bitti" button on last chapter */}
        {currentPage === story?.output?.chapters?.length && (
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              className="bg-primary text-white shadow-lg"
              onClick={() => paginate(1)}
            >
              Bitti
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] paper-texture">
        <Card className="p-8 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-6xl mb-4"
          >
            📖
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Loading Your Story</h3>
          <p className="text-lg opacity-70">Preparing your magical adventure...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 
      ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="h-full max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <Progress 
            value={calculateProgress()}
            size="md"
            radius="full"
            classNames={{
              base: "max-w-md mx-auto",
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]",
            }}
            showValueLabel
          />
          <p className="text-center mt-2 text-sm opacity-70">
            {currentPage === 0 ? "Kapak Sayfası" : 
             currentPage === story?.output?.chapters?.length + 1 ? "Son Sayfa" :
             `Bölüm ${currentPage} / ${story?.output?.chapters?.length}`}
          </p>
        </div>

        {/* Story Content */}
        <div 
          className="relative h-[calc(100vh-12rem)] rounded-xl overflow-hidden shadow-2xl"
          {...swipeHandlers}
        >
          {/* Navigation Controls - Left */}
          <Button
            isIconOnly
            variant="flat"
            onClick={() => paginate(-1)}
            disabled={currentPage === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 
              shadow-lg bg-white/90 backdrop-blur-sm z-20 transition-transform hover:scale-110
              md:left-8"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Navigation Controls - Right */}
          <Button
            isIconOnly
            variant="flat"
            onClick={() => paginate(1)}
            disabled={currentPage === story?.output?.chapters?.length + 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 
              shadow-lg bg-white/90 backdrop-blur-sm z-20 transition-transform hover:scale-110
              md:right-8"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                rotateY: { duration: 0.4 }
              }}
              className="absolute inset-0 perspective-1000"
            >
              {currentPage === 0 ? renderCoverPage() : 
               currentPage === story?.output?.chapters?.length + 1 ? renderLastPage() :
               renderChapterPage(story?.output?.chapters[currentPage - 1])}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ViewStory