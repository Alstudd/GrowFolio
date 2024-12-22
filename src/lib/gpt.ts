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
): Promise<any> {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `
You are to output the following in strict json format: ${JSON.stringify(output_format)}. 
Follow these rules strictly:
1. Output must be valid JSON that can be parsed by JSON.parse()
2. Use double quotes (") for strings, not single quotes (')
3. Do not use any special characters or escape sequences in answers
4. Ensure all required fields are present
5. If output is a list, wrap it in square brackets []
6. Each object should have all the specified fields
${list_output ? "\nIf output field is a list, classify output into the best element of the list." : ""}
${dynamic_elements ? "\nReplace any text between < and > with appropriate content" : ""}
${list_input ? "\nGenerate a list of json objects, one for each input element." : ""}`;

    let res: string = "";
    let output: any;

    try {
      const response = await openai.chat.completions.create({
        temperature,
        model,
        messages: [
          {
            role: "system",
            content: system_prompt + output_format_prompt + error_msg,
          },
          { role: "user", content: user_prompt.toString() },
        ],
      });

      res = response.choices[0].message?.content?.trim() ?? "";

      // Clean up the response to ensure valid JSON
      res = res.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
      res = res.replace(/\n/g, " ").replace(/\r/g, " ");

      // If response doesn't start with [ for array or { for object, wrap it
      if (list_input && !res.startsWith("[")) {
        res = `[${res}]`;
      }

      output = JSON.parse(res);

      if (list_input && !Array.isArray(output)) {
        output = [output];
      }

      // Validate output format
      for (
        let index = 0;
        index < (Array.isArray(output) ? output.length : 1);
        index++
      ) {
        const current = Array.isArray(output) ? output[index] : output;

        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in current)) {
            throw new Error(`Missing required field: ${key}`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            let value = current[key];

            if (Array.isArray(value)) {
              value = value[0];
            }

            if (!choices.includes(value) && default_category) {
              current[key] = default_category;
            }

            if (typeof value === "string" && value.includes(":")) {
              current[key] = value.split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(current);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nPrevious error: ${e}\nPlease fix the JSON format and try again.`;
      console.error("Attempt", i + 1, "failed:", e);
      if (verbose) {
        console.log("Current invalid json format:", res);
      }

      if (i === num_tries - 1) {
        throw new Error(
          `Failed after ${num_tries} attempts: ${e}\nLast response: ${res}`
        );
      }
    }
  }

  throw new Error("Failed to generate valid output");
}
