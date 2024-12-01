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
        content: `Give me 6 movies that fit the micro-genre of '${query}'? Return the movies in a list with the format "Title (Year) - Director. Provide just the list, and no other text.`,
      },
    ],
    model: "gpt-4o-mini",
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
      const infoSplit = movieSplit[1].split("-");

      const title = movieSplit[0].substring(3).trim();
      const year = infoSplit[0].replace(") ", "").trim();
      const director = infoSplit[1].replace(" - ", "").trim();

      console.log("title: ", title, "year: ", year, "director: ", director);

      recommendations.push({ title, year, director });
    });
  }

  return recommendations;
};
