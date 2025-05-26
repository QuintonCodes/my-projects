import {
  ArrowRight,
  CheckCircle,
  Globe,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 text-white bg-teal-700 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                About SwopMarket
              </h1>
              <p className="text-lg text-teal-100 md:text-xl">
                South Africa&apos;s trusted marketplace connecting buyers and
                sellers since 2020.
              </p>
            </div>
            <div className="relative h-64 md:h-80">
              <Image
                src="/placeholder.svg?height=320&width=640&text=SwopMarket+Team"
                alt="SwopMarket Team"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-xl text-muted-foreground">
              To create a safe, accessible platform that empowers South Africans
              to buy and sell with confidence.
            </p>
            <div className="my-8 border-b border-muted"></div>
            <p className="text-lg">
              SwopMarket was founded with a simple idea: make it easy for people
              to find what they need and sell what they don&apos;t. We believe
              in the power of community commerce to create economic
              opportunities, reduce waste, and connect people.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-center">
            Our Values
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center w-12 h-12 mb-2 text-teal-700 bg-teal-100 rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Community First</CardTitle>
                <CardDescription>
                  We build features that foster trust and connection between
                  buyers and sellers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>User-centered design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Community guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Feedback-driven improvements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-amber-100 text-amber-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle>Trust & Safety</CardTitle>
                <CardDescription>
                  We prioritize creating a secure environment for all
                  transactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Secure messaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>User verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Fraud prevention</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center w-12 h-12 mb-2 text-green-700 bg-green-100 rounded-full">
                  <Globe className="w-6 h-6" />
                </div>
                <CardTitle>Sustainability</CardTitle>
                <CardDescription>
                  We promote reuse and responsible consumption through our
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Extending product lifecycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Reducing waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-700 mt-0.5" />
                    <span>Supporting local commerce</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-teal-700">1M+</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-teal-700">5M+</h3>
              <p className="text-muted-foreground">Products Listed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-teal-700">3M+</h3>
              <p className="text-muted-foreground">Successful Sales</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-teal-700">9</h3>
              <p className="text-muted-foreground">Provinces Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-center">
            Our Team
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=300&width=300&text=SJ",
              },
              {
                name: "Thabo Nkosi",
                role: "CTO",
                image: "/placeholder.svg?height=300&width=300&text=TN",
              },
              {
                name: "Lerato Molefe",
                role: "Head of Operations",
                image: "/placeholder.svg?height=300&width=300&text=LM",
              },
              {
                name: "David van der Merwe",
                role: "Marketing Director",
                image: "/placeholder.svg?height=300&width=300&text=DM",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-teal-700">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Join Our Community
            </h2>
            <p className="text-lg text-teal-100">
              Whether you&apos;re looking to buy, sell, or just browse,
              SwopMarket has something for everyone.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/products">
                <Button
                  size="lg"
                  className="text-teal-700 bg-white hover:bg-teal-50"
                >
                  Start Shopping
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                  Start Selling
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
