"use client";
import {
  BarChartIcon,
  BrainCircuit,
  GalleryVerticalEnd,
  History,
  User,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts";

const Dashboard = ({ user, userData }: any) => {
  type UserDetails = {
    id: string;
    name: string | null;
    age: number | null;
    userClass: string | null;
  };

  const chartData = [
    { browser: "safari", scores: 68, fill: "var(--color-safari)" },
  ];
  const chartData1 = [
    { browser: "safari", scores: 80, fill: "var(--color-safari)" },
  ];
  const chartData2 = [
    { browser: "safari", scores: 30, fill: "var(--color-safari)" },
  ];

  const chartData3 = [
    { month: "Monday", desktop: 186, mobile: 80 },
    { month: "Tuesday", desktop: 305, mobile: 200 },
    { month: "Wednesday", desktop: 237, mobile: 120 },
    { month: "Thursday", desktop: 73, mobile: 190 },
    { month: "Friday", desktop: 209, mobile: 130 },
    { month: "Saturday", desktop: 214, mobile: 140 },
    { month: "Sunday", desktop: 250, mobile: 136 },
    { month: "Monday", desktop: 172, mobile: 180 },
    { month: "Tuesday", desktop: 305, mobile: 200 },
  ];
  const chartConfig = {
    scores: {
      label: "Scores",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <main className="mx-auto max-w-7xl p-8 pt-10">
        <div className="flex items-center justify-between">
          <h2 className="mr-2 text-3xl font-bold tracking-tight dark:text-white text-black">
            Dashboard
          </h2>
          <div className="flex items-center gap-3">
            <a href="/portfolio" className="rounded-md bg-white p-2 text-black">
              <User />
            </a>
            <a
              href="/leaderboard"
              className="rounded-md bg-white p-2 text-black"
            >
              <BarChartIcon />
            </a>
          </div>
        </div>

        <div className="my-5">
          <Card className="mb-7">
            <CardContent className="p-6 flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src={user?.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="Image"
                />
              </div>
              <div className="mx-5 flex-1">
                <div className="truncate text-sm font-medium dark:text-white text-gray-500 ">
                  {user ? (
                    <>
                      <h1>Welcome, {user.name}</h1>{" "}
                    </>
                  ) : (
                    <>
                      <h1>Welcome, Alston</h1>{" "}
                    </>
                  )}
                </div>
                <div className="truncate text-sm dark:text-white text-gray-500">
                  {user ? (
                    <>
                      <h1>Email : {user.email}</h1>{" "}
                    </>
                  ) : (
                    <>
                      <h1>Email : alstonsoares17@gmail.com </h1>{" "}
                    </>
                  )}
                </div>
              </div>
              <div className="inline-flex gap-4 items-center text-base font-semibold dark:text-white text-gray-500">
                <Image
                  src="/eddieLogo.png"
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="Image"
                />
                <div>
                  <div>
                    <h1>FolioCoins</h1>
                  </div>
                  <div className="text-xs font-light">
                    <h1>{userData.coins}</h1>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Gen  */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <a href="/quiz" className="md:col-span-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src="/eddieNGamer.png"
                    width={80}
                    height={80}
                    className="my-auto"
                    alt="Eddie"
                  />

                  <div className="leading-1.5 hidden w-full max-w-[360px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 md:block">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 ">
                        Mr. Folio, Your Assistant
                      </span>
                      <span className="text-sm font-normal text-gray-500">
                        Now
                      </span>
                    </div>
                    <p className="py-2.5 text-sm font-normal text-gray-900 ">
                      Practice makes you Perfect, Come On!! Let&apos;s learn
                      together{" "}
                      <span className="font-bold">&quot;Start Now&quot;!</span>
                    </p>
                  </div>

                  <div className="my-auto md:mr-10">
                    <h1 className="text-lg font-bold md:text-xl">
                      Quiz Generator
                    </h1>
                    <p className="md:text-md text-sm">
                      Test your knowledge, practice well and revise by using the
                      Quiz generator to make a quiz with single word prompts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
          <a href="/history">
            <Card className="h-full w-full">
              <CardContent className="flex p-4 flex-col items-center justify-center">
                <div className="flex w-full justify-between">
                  <h1 className="text-lg font-bold md:text-xl">Quiz History</h1>
                  <History size={20} />
                </div>
                <p className="md:text-md text-sm">
                  Check out all the quizzes you attempted
                </p>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Streaks  */}
        <div className="mt-4 gap-4 md:flex">
          {/* <div className="flex gap-3"> */}
          <Card className=" flex flex-col w-full max-w-[7rem] p-2 px-0 md:my-0">
            {/* <Image className="rounded-full" src='/Hero/streaks.gif' height={60} width={60} alt="Streaks" /> */}
            <video
              className="h-16 w-full rounded-full"
              src="/streaks.mp4"
              autoPlay
              muted
              loop
            />
            <h3 className="my-auto text-3xl text-center font-semibold">3</h3>
          </Card>
          <a href="/stockSimulation">
            <Card className="h-full w-full">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="flex w-full justify-between">
                  <h1 className="text-lg font-bold md:text-xl">Stock Simulation</h1>
                  <BrainCircuit size={20} />
                </div>
                <p className="md:text-md text-sm">
                  Learn how to invest in stocks and manage your portfolio through a fun and interactive simulation
                </p>
              </CardContent>
            </Card>
          </a>
          {/* </div> */}
          <Card className="mx-auto my-4 flex w-full items-center justify-between px-4 py-3.5 md:my-0">
            <div className="flex items-center space-x-2.5">
              <div className="flex flex-col">
                <div className="dark:text-dark-tremor-content-strong font-medium text-tremor-content-strong">
                  {user?.name ? user?.name : "Alston"}
                </div>
                <span className="dark:text-dark-tremor-content text-sm text-tremor-default text-tremor-content">
                  Today&apos;s Progress
                </span>
              </div>
            </div>

            <div className="h-[100px] w-[220px]">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData3}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="desktop"
                    stackId="a"
                    fill="var(--color-bar)"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="mobile"
                    stackId="a"
                    fill="var(--color-bar)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="flex items-center space-x-5">
              <div className="hidden flex-col md:flex">
                <span className="dark:text-dark-tremor-content text-tremor-default text-tremor-content">
                  Courses
                </span>
                <span className="dark:text-dark-tremor-content-strong mx-auto font-medium text-tremor-content-strong">
                  15
                </span>
              </div>
              <div className="hidden flex-col md:flex">
                <span className="dark:text-dark-tremor-content text-tremor-default text-tremor-content">
                  Quizzes
                </span>
                <span className="dark:text-dark-tremor-content-strong mx-auto font-medium text-tremor-content-strong">
                  {userData.games.length}
                </span>
              </div>
              <span className="rounded bg-emerald-500 px-2 py-1 text-tremor-default font-medium text-white">
                +1.72%
              </span>
            </div>
          </Card>
        </div>

        {/* Course Gen  */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <a href="/create">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between gap-3 md:gap-10">
                  <div className="my-auto">
                    <h1 className="text-lg font-bold md:text-xl">
                      Course Generator
                    </h1>
                    <p className="md:text-md text-sm">
                      Learn the best way by creating your own course
                    </p>
                  </div>
                  <Image
                    src="/eddieSmile.png"
                    width={80}
                    height={80}
                    alt="Eddie"
                  />
                </div>
              </CardContent>
            </Card>
          </a>
          <div className="grid grid-cols-2 gap-4">
            <a href="/gallery">
              <Card className="h-full w-full">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="flex w-full justify-between">
                    <h1 className="text-lg font-bold md:text-xl">Gallery</h1>
                    <GalleryVerticalEnd size={20} />
                  </div>
                  <p className="md:text-md text-sm">
                    Check out all the courses you generated
                  </p>
                </CardContent>
              </Card>
            </a>
            <a target="_blank" href="http://localhost:5173">
              <Card className="h-full w-full">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="flex w-full justify-between">
                    <h1 className="text-lg font-bold md:text-xl">Budgeting</h1>
                    <Workflow size={20} />
                  </div>
                  <p className="md:text-md text-sm">
                    Learn how to manage your finance and budgeting through GrowFlow's Budget Simulation
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>

        {/* Recent Performance  */}
        <div className="my-5 text-white">
          <h4 className="mx-5">Your Course Performance</h4>
          <div className="my-2 grid grid-cols-3 gap-3">
            <div className="space-y-3">
              <Card className="mx-auto max-w-sm">
                <div className="flex items-center justify-start space-x-5">
                  <CardContent className="py-3 flex-1">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square h-[100px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={250}
                        innerRadius={45}
                        outerRadius={67}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[50, 42]}
                        />
                        <RadialBar
                          dataKey="scores"
                          background
                          cornerRadius={10}
                        />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {chartData[0].scores.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 12}
                                      className="fill-muted-foreground"
                                    >
                                      Scores
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                  <div>
                    <p className="dark:text-dark-tremor-content-strong text-tremor-default text-lg font-bold text-tremor-content-strong">
                      Stocks
                    </p>
                    <p className="dark:text-dark-tremor-content text-sm text-tremor-default text-tremor-content">
                      What is special about stocks?
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="space-y-3">
              <Card className="mx-auto max-w-sm">
                <div className="flex items-center justify-start space-x-5">
                  <CardContent className="py-3 flex-1">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square h-[100px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={290}
                        innerRadius={45}
                        outerRadius={67}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[50, 42]}
                        />
                        <RadialBar
                          dataKey="scores"
                          background
                          cornerRadius={10}
                        />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {chartData1[0].scores.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 12}
                                      className="fill-muted-foreground"
                                    >
                                      Scores
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                  <div>
                    <p className="dark:text-dark-tremor-content-strong text-tremor-default text-lg font-bold text-tremor-content-strong">
                      Finance
                    </p>
                    <p className="dark:text-dark-tremor-content text-sm text-tremor-default text-tremor-content">
                      How to manage your finance?
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="space-y-3">
              <Card className="mx-auto max-w-sm">
                <div className="flex items-center justify-start space-x-5">
                  <CardContent className="py-3 flex-1">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square h-[100px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={60}
                        innerRadius={45}
                        outerRadius={67}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[50, 42]}
                        />
                        <RadialBar
                          dataKey="scores"
                          background
                          cornerRadius={10}
                        />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {chartData2[0].scores.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 12}
                                      className="fill-muted-foreground"
                                    >
                                      Scores
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                  <div>
                    <p className="dark:text-dark-tremor-content-strong text-tremor-default text-lg font-bold text-tremor-content-strong">
                      Budgeting
                    </p>
                    <p className="dark:text-dark-tremor-content text-sm text-tremor-default text-tremor-content">
                      Why is budgeting important?
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
