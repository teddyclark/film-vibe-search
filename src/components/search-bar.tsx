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

  return (
    <SearchBarContainer>
      <InputContainer>
        <StyledInput
          onChange={props.onChange}
          value={props.value}
          placeholder={PLACEHOLDERS[placeholder]}
          type="text"
        />
        <SearchButton
          type="submit"
          onClick={props.handleSearch}
          onKeyDown={(e) =>
            e.key === "Enter" ? props.handleSearch : () => undefined
          }
        >
          <IconSearch width={25} />
        </SearchButton>
      </InputContainer>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 32px;
`;

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
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
  position: absolute;
  right: 12px;
  top: 12px;

  border: none;
  background-color: transparent;

  cursor: pointer;
`;
