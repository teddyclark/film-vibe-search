import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import IconSearch from "./search-icon";

const PLACEHOLDERS = [
  'Try "I just want to feel something"',
  'Try "chemistry, confusing, romantic"',
  'Try "I want to feel like I\'m in a movie"',
  'Try "amazing practical effects"',
  'Try "weird superheros"',
  'Try "something a filmbro would like"',
  'Try "the main character has cool sunglasses"',
];

type SearchBarProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  value: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const [placeholder, setPlaceholder] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setPlaceholder((prevData) => {
          if (prevData + 1 > PLACEHOLDERS.length - 1) {
            return 0;
          } else {
            return prevData + 1;
          }
        }),
      2500,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleSearch();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <SearchBarContainer>
        <InputContainer>
          <StyledInput
            onChange={props.onChange}
            value={props.value}
            placeholder={PLACEHOLDERS[placeholder]}
            type="text"
          />
          <SearchButton type="submit">
            <IconSearch width={25} />
          </SearchButton>
        </InputContainer>
      </SearchBarContainer>
    </form>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 32px;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 50px;
  padding: 14px 16px 16px 24px;
  width: 400px;

  font-size: 18px;
  font-family: "PlayfairDisplay-Regular", serif;

  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease all;

  &:focus {
    outline: none;
    box-shadow: 0px 4px 50px rgba(255, 255, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  margin-left: -50px;

  cursor: pointer;

  @media (max-width: 768px) {
    right: -24px;
    z-index: 2;
  }
`;
