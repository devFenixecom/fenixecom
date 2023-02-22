import axios from "axios";

export async function generateText(prompt: string) {
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt,
      max_tokens: 150,
      n: 1,
      stop: ["\n"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text.trim();
}
