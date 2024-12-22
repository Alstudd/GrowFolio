import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/courseGpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, units = [] } = createChaptersSchema.parse(body);

    console.log("Logging the title and units:", title, units);

    // Define a type for output units
    type outputUnit = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    };

    let output_units: outputUnit[];

    if (units.length > 0) {
      // Generate course content for each unit provided by the user
      output_units = await Promise.all(
        units.map(async (unit) => {
          return await strict_output(
            "You are an AI capable of curating course content...",
            `It is your job to create a unit about ${unit} for the course titled ${title}. Provide chapter titles and relevant YouTube search queries.`,
            {
              title: "string",
              chapters: {
                youtube_search_query: "string",
                chapter_title: "string",
              },
            }
          );
        })
      );
    } else {
      // Generate content for a single default unit
      const defaultUnit = await strict_output(
        "You are an AI capable of curating course content...",
        `It is your job to create a single unit for the course titled ${title}. Provide chapter titles and relevant YouTube search queries.`,
        {
          title: "string",
          chapters: {
            youtube_search_query: "string",
            chapter_title: "string",
          },
        }
      );
      output_units = [defaultUnit];
    }

    console.log("Logging the output units:", output_units);

    // Ensure output_units is always an array with valid structure
    output_units = output_units.filter(
      (unit) => unit && unit.title && Array.isArray(unit.chapters)
    );

    if (output_units.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate course content" },
        { status: 500 }
      );
    }

    const imageSearchTerm = await strict_output(
      "You are an AI capable of finding the most relevant image...",
      `Provide a good image search term for a course titled ${title}.`,
      {
        image_search_term: "string",
      }
    );

    if (!imageSearchTerm?.image_search_term) {
      return NextResponse.json(
        { error: "Failed to generate image search term" },
        { status: 500 }
      );
    }

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    if (!course_image) {
      return NextResponse.json(
        { error: "Failed to fetch course image" },
        { status: 500 }
      );
    }

    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
      },
    });

    try {
      for (const unit of output_units) {
        const prismaUnit = await prisma.unit.create({
          data: {
            name: unit.title,
            courseId: course.id,
          },
        });

        if (unit.chapters.length > 0) {
          await prisma.chapter.createMany({
            data: unit.chapters.map((chapter) => ({
              name: chapter.chapter_title,
              youtubeSearchQuery: chapter.youtube_search_query,
              unitId: prismaUnit.id,
            })),
          });
        }
      }
    } catch (error) {
      console.error("Error creating units and chapters:", error);
      await prisma.course.delete({ where: { id: course.id } });
      return NextResponse.json(
        { error: "Failed to create course structure" },
        { status: 500 }
      );
    }

    return NextResponse.json({ course_id: course.id }, { status: 200 });
  } catch (error) {
    console.error("Error in course creation:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
