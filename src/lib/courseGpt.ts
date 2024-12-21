import OpenAI from "openai";

const apiKey = process.env.NEXT_OPENAI_API_KEY;

if (!apiKey) {
  throw Error("Missing NEXT_OPENAI_API_KEY");
}

const openai = new OpenAI({ apiKey });

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `
You are to output ${list_output ? "an array of objects in" : ""} the following format:
${JSON.stringify(output_format, null, 2)}

IMPORTANT: Your response must be valid JSON. Ensure all strings are properly quoted.
- Every property name must be in double quotes
- Every string value must be in double quotes
- Use proper JSON syntax with commas between properties
- Arrays must be properly formatted with square brackets
- Do not include any explanatory text outside the JSON structure

Example of correct formatting:
{
  "title": "Sample Title",
  "chapters": [
    {
      "youtube_search_query": "sample search query",
      "chapter_title": "Sample Chapter"
    }
  ]
}`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nReplace any text enclosed in < and > with appropriate generated content.`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
    }

    const response = await openai.chat.completions.create({
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    const res: string = response.choices[0].message?.content?.trim() ?? "";

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    try {
      // Check if response starts with { or [ and ends with } or ]
      // Using a more compatible regex pattern without the 's' flag
      if (!/^[\[\{][\s\S]*[\}\]]$/.test(res)) {
        throw new Error("Response is not a valid JSON structure");
      }

      let output: any = JSON.parse(res);

      if (list_input && !Array.isArray(output)) {
        throw new Error("Output format not in an array of json");
      }

      output = list_input ? output : [output];

      // Validate each output object
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in output[index])) {
            throw new Error(`${key} not in json output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];

            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }

            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }

            if (
              typeof output[index][key] === "string" &&
              output[index][key].includes(":")
            ) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid json format:", res);
    }
  }

  return [];
}
