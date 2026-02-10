import React from "react";
import {  Head } from "@inertiajs/react";

import Navbar from "@/Components/Header";
import Hero from "@/Components/Home/hero";
import ProblemSolution from "@/Components/Home/problem-solution";
import Features from "@/Components/Home/features";
import { HowItWorks } from "@/Components/Home/how-it-works";
import EarlyAccess from "@/Components/Home/early-access";
import CTA from "@/Components/Home/cta";
import Footer from "@/Components/Shared/footer";
const Home = () => {
  return (
    <>
      <Head title="Welcome" />
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
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
