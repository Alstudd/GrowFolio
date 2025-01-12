"use client";
import React, { useState } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "./ui/button";
import { IconCloud } from "@/components/ui/IconCloud";
import { ConfettiButton } from "@/components/ui/Confetti";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const slugs = [
  "paypal",
  "visa",
  "mastercard",
  "stripe",
  "americanexpress",
  "coinbase",
  "binance",
  "blockchain",
  "ethereum",
  "bitcoin",
  "tether",
  "square",
  "revolut",
  "robinhood",
  "cashapp",
  "yahoo",
  "bankofamerica",
  "goldmansachs",
  "jp-morgan",
  "hsbc",
  "citibank",
  "wellsfargo",
  "fidelity",
  "schwab",
  "vanguard",
  "blackrock",
  "intuit",
  "adp",
  "braintree",
  "klarna",
  "afterpay",
  "zelle",
  "monzo",
  "sofi",
  "transferwise",
  "alipay",
  "wechat",
  "squareenix",
  "venmo",
];

export function HeroScrollDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  interface Item {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    gridArea: string;
  }

  const items: Item[] = [
    {
      id: "1",
      title: "Quiz Generator",
      subtitle: "Generate interactive quizzes",
      content:
        "Create quizzes that test user knowledge with multiple question types and grading options.",
      gridArea: "1 / 1 / 2 / 2",
    },
    {
      id: "2",
      title: "Course Generator",
      subtitle: "Create and manage courses",
      content:
        "Design educational courses with structured lessons, modules, and assessments to enhance learning.",
      gridArea: "1 / 2 / 2 / 4",
    },
    {
      id: "3",
      title: "RoadMap Brainstorming",
      subtitle: "Plan and brainstorm your roadmap",
      content:
        "Collaboratively create and brainstorm project roadmaps, allowing for milestone tracking and team input.",
      gridArea: "2 / 1 / 4 / 2",
    },
    {
      id: "4",
      title: "Customized Personal Chatbot",
      subtitle: "Build your own chatbot",
      content:
        "Develop personalized AI chatbots tailored to specific needs, offering customizable conversations and responses.",
      gridArea: "2 / 2 / 4 / 4",
    },
  ];

  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="md:text-4xl text-lg md:font-bold">
                Welcome to the future of <br />
                <span className="text-4xl lg:text-[7rem] md:text-[5rem] font-bold mt-5 leading-none">
                  Smart Finance
                </span>
              </h1>
            </>
          }
        >
          <video
            src={`/welcome.mp4`}
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            autoPlay
            loop
            muted
          />
        </ContainerScroll>
      </div>
      <div className="my-10 w-[80%] mx-auto md:grid grid-cols-2 gap-3">
        <div className="my-auto">
          <div className="md:text-4xl text-3xl font-bold mb-3">
            Unlock the Joy of Learning Finance with GrowFolio
          </div>
          <p className="">
            Dive into a world of fun and creativity where learning is not only
            educational but also enjoyable. With GrowFolio, you can learn
            finance concepts in a fun and interactive way.
          </p>
          <a href="/dashboard">
            <Button className="my-3">Dashboard</Button>
          </a>
        </div>

        <Image
          src="/newWorld.png"
          className=""
          width={500}
          height={500}
          alt="World"
        />
      </div>

      <div className="h-full bg-[#CAEC9B]">
        <div className="w-[80%] mx-auto grid gap-5 md:grid-cols-2">
          <div>
            <Image
              src="/rollercoaster.gif"
              height={1200}
              width={1200}
              alt="rollercoaster"
            />
          </div>
          <div className="mb-7 flex flex-col justify-center text-black px-10 md:mb-0 lg:px-16">
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">
              Join the Adventure at GrowFolio!
            </h1>
            <p className="">
              Grow with a portfolio of financial knowledge and skills that will
              take you on a thrilling journey of learning and discovery.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto grid gap-10 md:grid-cols-2 md:pt-0 pt-10">
        <div className="my-auto">
          <div className="md:text-4xl text-3xl font-bold mb-3">
            Learn finance Faster Quicker and Fun!!
          </div>
          <p className="mb-5">
            Learning is more fun when there is something to remember ...
            Don&apos;t make learning boring use GrowFolio and excel in your
            financial wellbeing
          </p>
          <div className="relative">
            <ConfettiButton>GrowFolio 🎉</ConfettiButton>
          </div>
        </div>
        <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg dark:bg-black bg-white md:px-10 px-0 md:pt-8 pt-0 pb-20">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    </>
  );
}
