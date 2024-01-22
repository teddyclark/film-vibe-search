import styled from "styled-components";
import Modal from "react-modal";

import { MovieData } from "../utils/types";
import { Header2, Header3, Header4, Text } from "./text";
import { useState } from "react";
import CloseIcon from "./close-icon";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

export const MovieTile = ({ movieData }: { movieData: MovieData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <MovieTileContainer onClick={() => setIsModalOpen(true)}>
        <Poster src={IMAGE_PATH + movieData.poster_path} />
        <Header3>{movieData.title}</Header3>
      </MovieTileContainer>

      <StyledModal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={true}
        background={IMAGE_PATH + movieData.backdrop_path}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        appElement={document.getElementById("root") as HTMLElement}
      >
        <ButtonContainer>
          <CloseButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </CloseButton>
        </ButtonContainer>

        <Poster src={IMAGE_PATH + movieData.poster_path} />
        <Header2>{movieData.title}</Header2>
        <Text>{"Directed by " + movieData.director}</Text>

        <ContentContainer>
          <InfoContainer>
            <div>
              <Header2>Release Date</Header2>
              <Text>{movieData.release_date}</Text>
            </div>

            <div>
              <Header2>Rating</Header2>
              <Text>{movieData.vote_average} / 10</Text>
            </div>
          </InfoContainer>

          <div>
            <Header2>Overview</Header2>
            <Text>{movieData.overview}</Text>
          </div>
        </ContentContainer>
      </StyledModal>
    </>
  );
};

const MovieTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  width: 225px;
`;

const Poster = styled.img`
  width: 200px;
  border-radius: 4px;

  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
`;

interface StyledModalProps {
  background: string;
}

const StyledModal = styled(Modal)<StyledModalProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;

  padding: 32px;

  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
    ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center center;
  border-radius: 16px;
  color: #f0f0e7;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.75);

  width: 525px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 64px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  gap: 16px;
  padding-top: 32px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: left;

  width: 100%;
`;

const CloseButton = styled.button`
  color: #f0f0e7;

  border: none;
  background-color: transparent;

  cursor: pointer;
`;
