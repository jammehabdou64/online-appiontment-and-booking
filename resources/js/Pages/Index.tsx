import React from "react";
import { Head } from "@inertiajs/react";

import Navbar from "@/Components/Header";
import Hero from "@/Components/Home/hero";
import FeaturedBusinesses from "@/Components/Home/featured-businesses";
import ProblemSolution from "@/Components/Home/problem-solution";
import Features from "@/Components/Home/features";
import { HowItWorks } from "@/Components/Home/how-it-works";
import EarlyAccess from "@/Components/Home/early-access";
import CTA from "@/Components/Home/cta";
import Footer from "@/Components/Shared/footer";
import { cn } from "@/lib/utils";

interface IndexProps {
  featuredBusinesses?: Array<{
    id: number | string;
    name: string;
    slug?: string;
    description?: string | null;
    address?: string | null;
    email?: string | null;
    website?: string | null;
    logo?: string | null;
    is_active?: boolean;
  }>;
}

const Home = ({ featuredBusinesses = [] }: IndexProps) => {
  return (
    <>
      <Head title="Welcome" />
      <div
        className={cn(
          "flex flex-col min-h-screen}",
          "bg-[hsl(var(--sidebar-background))]",
        )}
      >
        <Navbar />
        <main>
          <Hero />
          <FeaturedBusinesses businesses={featuredBusinesses} />
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <EarlyAccess />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
