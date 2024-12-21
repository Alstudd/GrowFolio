"use client";
import React, { useState } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "./ui/button";
import { IconCloud } from "@/components/ui/IconCloud";
import { ConfettiButton } from "@/components/ui/Confetti";
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function HeroScrollDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  interface Item {
    id: string
    title: string
    subtitle: string
    content: string
    gridArea: string
  }
  
  const items: Item[] = [
    { 
      id: '1', 
      title: 'Quiz Generator', 
      subtitle: 'Generate interactive quizzes', 
      content: 'Create quizzes that test user knowledge with multiple question types and grading options.', 
      gridArea: '1 / 1 / 2 / 2' 
    },
    { 
      id: '2', 
      title: 'Course Generator', 
      subtitle: 'Create and manage courses', 
      content: 'Design educational courses with structured lessons, modules, and assessments to enhance learning.', 
      gridArea: '1 / 2 / 2 / 4' 
    },
    { 
      id: '3', 
      title: 'RoadMap Brainstorming', 
      subtitle: 'Plan and brainstorm your roadmap', 
      content: 'Collaboratively create and brainstorm project roadmaps, allowing for milestone tracking and team input.', 
      gridArea: '2 / 1 / 4 / 2' 
    },
    { 
      id: '4', 
      title: 'Customized Personal Chatbot', 
      subtitle: 'Build your own chatbot', 
      content: 'Develop personalized AI chatbots tailored to specific needs, offering customizable conversations and responses.', 
      gridArea: '2 / 2 / 4 / 4' 
    }
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
            <Button className="my-3">
              Dashboard
            </Button>
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
      <div className="w-[80%] mx-auto flex gap-10">
        <div className="my-auto">
          <div className="md:text-4xl text-3xl font-bold mb-3">
            Learn finance Faster Quicker and Fun!!
          </div>
          <p className="mb-5">
            Learning is more fun when there is something to remember ... Don&apos;t make learning boring use GrowFolio and excel in your financial wellbeing
          </p>
          <div className="relative">
            <ConfettiButton>GrowFolio 🎉</ConfettiButton>
          </div>

        </div>
        <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8 ">
          <IconCloud iconSlugs={slugs} />
        </div>

      </div>

      <div className="w-[80%] container mx-auto p-8">
      <motion.div 
        className="grid grid-cols-3 grid-rows-3 gap-4 w-full aspect-[4/3]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            onClick={() => setSelectedId(item.id)}
            className="bg-white rounded-3xl shadow-lg cursor-pointer p-6 flex flex-col justify-between"
            style={{ gridArea: item.gridArea }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <motion.h3 className="text-2xl font-bold mb-2 text-purple-800">{item.title}</motion.h3>
              <motion.p className="text-sm text-purple-600">{item.subtitle}</motion.p>
            </div>
            <motion.p className="text-purple-700 mt-4">{item.content}</motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="fixed inset-0 bg-purple-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={selectedId}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl"
            >
              {items.filter(item => item.id === selectedId).map(item => (
                <div key={item.id}>
                  <motion.h2 className="text-3xl font-bold mb-4 text-purple-800">{item.title}</motion.h2>
                  <motion.p className="text-lg mb-4 text-purple-600">{item.subtitle}</motion.p>
                  <motion.p className="text-base text-purple-700">{item.content}</motion.p>
                  <motion.button
                    onClick={() => setSelectedId(null)}
                    className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
  {selectedId && (
    <motion.div 
      className="fixed inset-0 bg-purple-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedId(null)}  // Close on background click
    >
      <motion.div
        layoutId={selectedId}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside the modal
      >
        {items.filter(item => item.id === selectedId).map(item => (
          <div className="relative" key={item.id}>
            <motion.h2 className="text-3xl font-bold mb-4 text-purple-800">{item.title}</motion.h2>
            <motion.p className="text-lg mb-4 text-purple-600">{item.subtitle}</motion.p>
            <motion.p className="text-base text-purple-700">{item.content}</motion.p>
            <motion.button
              onClick={() => setSelectedId(null)}
              className="absolute top-0 right-0 px-4 py-2 text-purple-600 rounded-md transition-colors"
            >
              <X/>
            </motion.button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </>
  );
}
