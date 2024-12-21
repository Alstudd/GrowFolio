import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/courseGpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    console.log("logging the title and units", title, units);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];

    console.log("Logging the length of the units:", units.length);

    let output_units: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`,
      {
        title: "string",
        chapters: {
          youtube_search_query: "string",
          chapter_title: "string",
        },
      }
    );

    // Ensure output_units is always an array
    if (!Array.isArray(output_units)) {
      output_units = [output_units];
    }

    // Validate the structure of output_units
    if (!output_units || output_units.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate course content" },
        { status: 500 }
      );
    }

    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
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
        if (!unit.title || !Array.isArray(unit.chapters)) {
          console.error("Invalid unit structure:", unit);
          continue;
        }

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

        console.log("Created unit:", prismaUnit);
      }
    } catch (error) {
      console.error("Error creating units and chapters:", error);
      // Attempt to clean up the course if unit creation fails
      await prisma.course.delete({
        where: { id: course.id },
      });
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
