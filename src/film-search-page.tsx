import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import { MovieTile } from "./components/movie-tile";
import { MovieData } from "./utils/types";
import { chatGPT } from "./utils/chat-gpt";
import { Header1, Header2, Header3, Text } from "./components/text";
import { SearchBar } from "./components/search-bar";
import tmdb_logo from "./images/tmdb-logo.svg";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}`;

export const FilmSearchPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // handle search input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // handle search button click
  const handleSearch = async () => {
    setIsLoading(true);

    setMovieData([]);
    const recommendations = await chatGPT(searchInput);

    // fetch movie data for each item in chatGPT response
    recommendations.forEach((movie) => {
      fetch(`${API_BASE_URL}&query=${movie.title}&year=${movie.year}`)
        .then((response) => response.json())
        .then((data) =>
          setMovieData((prevData) => [
            ...prevData,
            { ...data.results[0], director: movie.director } as MovieData,
          ]),
        )
        .catch((err) => console.error("error retrieving movie details", err));
    });

    setIsLoading(false);
  };

  return (
    <>
      <PageContainer>
        <Header1>Film Mood Search</Header1>
        <Header2>Discover movies based on your current vibe</Header2>

        <SearchBar
          onChange={handleChange}
          handleSearch={handleSearch}
          value={searchInput}
        />

        <MovieContainer>
          {movieData.length != 0 &&
            movieData.map((movie: MovieData) => {
              return <MovieTile key={movie.id} movieData={movie} />;
            })}

          {isLoading && <Header3>Finding films...</Header3>}
        </MovieContainer>
      </PageContainer>

      <Footer>
        <FooterContent>
          <Text>&copy; 2024 Teddy Clark</Text>
          <div>
            <Text>Movie data powered by </Text>
            <img src={tmdb_logo} alt="TMDb logo" width={100} />
          </div>
        </FooterContent>
      </Footer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;

  padding-top: 64px;
  padding-bottom: 64px;
  gap: 16px;

  background: linear-gradient(180deg, #530094 25%, rgba(9, 0, 15, 1) 100%);
  color: #f0f0e7;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  gap: 24px;

  padding-top: 64px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`;

const Footer = styled.div`
  background-color: #09000f;
  color: #f0f0e7;
  width: 100%;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 32px;
`;
