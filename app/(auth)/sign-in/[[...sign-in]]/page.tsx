import Image from 'next/image'
import { SignIn } from "@clerk/nextjs"
import { Card, CardBody } from "@nextui-org/card"

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="grid min-h-screen w-full animate-fade-in grid-cols-1 md:grid-cols-2">
        {/* Image Section */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <Image
            src="/login.png"
            alt="Login illustration"
            fill
            priority
            className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
            sizes="(max-width: 768px) 0vw, 50vw"
            quality={90}
          />
        </div>

        {/* Sign In Section */}
        <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
          <Card className="w-full max-w-md border-none bg-background/60 shadow-2xl backdrop-blur-sm">
            <CardBody className="overflow-hidden px-4 py-6 sm:px-6 md:px-8">
              {/* Mobile Logo - Only visible on mobile */}
              <div className="mb-8 text-center md:hidden">
                <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
                  JoyStory
                </h2>
                <p className="mt-2 text-sm text-foreground/60">Sign in to continue your journey</p>
              </div>
              
              <SignIn />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}