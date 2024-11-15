
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Echoes Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="ml-2 text-2xl font-bold text-gray-900">Echoes</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Type Through Memories or Conquer Challenges – You Decide.
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Embark on an emotional journey with a father's memories or jump straight into fast-paced typing challenges.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/login">Play With Story</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/play">Play Without Story</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <Image
                    src="/placeholder.svg?height=500&width=300"
                    alt="Father and daughter fading imagery"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white animate-pulse">Type to Begin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Feature Highlights</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Immersive Storyline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Dive into a captivating narrative that unfolds with every keystroke.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Speed Typing Combat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Test your typing skills in fast-paced battles against time and challenges.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboards & Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track your progress, compete with others, and climb the ranks.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-4">
              {[
                { title: "Choose Your Mode", description: "Log in for the story or play as a guest." },
                { title: "Type to Win", description: "Defeat challenges with your typing skills." },
                { title: "Progress & Unlock", description: "Level up and reveal memories in story mode." },
                { title: "Climb the Ranks", description: "Track your progress on the leaderboard." }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-800 font-bold text-xl mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Your Journey?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Choose your path and begin your typing adventure now!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">Play With Story</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/play">Play Without Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Echoes. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#contact">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}