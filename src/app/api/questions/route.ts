import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
// import { getAuthSession } from "@/lib/nextauth";

export const POST = async (req: Request, res: Response) => {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //     return NextResponse.json(
    //         { error: "You are not authenticated." },
    //         {
    //             status: 401,
    //         }
    //     );
    // }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: `Actual question string which is associated with ${topic}`,
          answer:
            "correct answer with max length of 15 words which is associated with the question. It should be a string which do not contain any special characters.",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: `Actual question string which is associated with ${topic}. Example: What is the capital of Nigeria?`,
          answer:
            "correct answer with max length of 15 words which is associated with the question. It should be a string which do not contain any special characters. Example: Abuja",
          option1:
            "option1 with max length of 15 words.It should be a string which do not contain any special characters. Example: Lagos",
          option2:
            "option2 with max length of 15 words.It should be a string which do not contain any special characters. Example: Kano",
          option3:
            "option3 with max length of 15 words.It should be a string which do not contain any special characters. Example: Kaduna",
        }
      );
      console.log("Questions which is getting generated", questions);
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    } else {
      console.error("Gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
};
