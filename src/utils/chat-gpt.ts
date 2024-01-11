import OpenAI from "openai";

import { AiMovieResponse } from "./types";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatGPT = async (query: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me 6 movies that fit the micro-genre of '${query}'? Include only movie titles, year, and nothing else in a list.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  // parse chatGPT response
  const recommendations: AiMovieResponse[] = [];
  if (
    completion &&
    completion.choices &&
    completion.choices[0] &&
    completion.choices[0].message &&
    completion.choices[0].message.content
  ) {
    const split = completion.choices[0].message.content.split("\n") ?? [];

    split.forEach((movie) => {
      const movieSplit = movie.split(" (");
      const title = movieSplit[0].substring(3);
      const year = movieSplit[1].replace(")", "");

      recommendations.push({ title, year });
    });
  }

  return recommendations;
};
