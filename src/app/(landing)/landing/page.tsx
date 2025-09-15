import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Search, MessageSquare, Briefcase, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary to-purple-600">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-primary-foreground">
                Find Your Path, Together.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                MentorConnect is a platform dedicated to fostering meaningful connections between mentors and mentees. Grow your skills, expand your network, and achieve your goals.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
                   <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose MentorConnect?</h2>
              <p className="text-muted-foreground mt-4">
                We provide the tools and community to help you succeed on your professional journey.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Search className="h-8 w-8 text-primary" />}
                title="Discover Connections"
                description="Easily search and filter to find the perfect mentor or mentee based on skills, industry, and goals."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Build Your Network"
                description="Connect with professionals, manage your connections, and grow your professional circle."
              />
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-primary" />}
                title="Meaningful Conversations"
                description="Integrated messaging to facilitate communication and schedule mentorship sessions."
              />
              <FeatureCard
                icon={<Briefcase className="h-8 w-8 text-primary" />}
                title="Profile Optimization"
                description="Use our AI Assistant to enhance your profile and attract the right connections."
              />
              <FeatureCard
                icon={<Star className="h-8 w-8 text-primary" />}
                title="AI-Powered Suggestions"
                description="Receive intelligent mentor suggestions based on your profile and aspirations."
              />
               <FeatureCard
                icon={<CheckCircle className="h-8 w-8 text-primary" />}
                title="Track Your Progress"
                description="Set goals and track your mentorship journey to see how far you've come."
              />
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="w-full py-20 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                    <p className="text-muted-foreground mt-4">
                        Getting started with MentorConnect is simple and straightforward.
                    </p>
                </div>
                <div className="relative grid gap-12 md:grid-cols-3">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
                     <Step number="1" title="Create Your Profile" description="Sign up and build your profile. Highlight your skills, experience, and what you're looking for." />
                     <Step number="2" title="Find a Match" description="Browse profiles or use our AI suggestions to find the right mentor or mentee for you." />
                     <Step number="3" title="Start Connecting" description="Send a connection request and start a conversation. Schedule sessions and begin your journey." />
                </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to Boost Your Career?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join a community of motivated individuals and experienced professionals today.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">Sign Up for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
       <footer className="bg-card border-t">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Users className="h-6 w-6" />
                <span>MentorConnect</span>
            </div>
            <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} MentorConnect. All rights reserved.
            </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="mb-4 bg-primary/10 p-3 rounded-full">
            {icon}
        </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

function Step({number, title, description}: {number: string, title: string, description: string}) {
    return (
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                {number}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-xs">{description}</p>
        </div>
    )
}
