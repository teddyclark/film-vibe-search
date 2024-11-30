import styled from "styled-components";

export const Header1 = styled.h1`
  font-family: "PlayfairDisplay-MediumItalic", serif;
  font-size: 64px;
  padding: 64px 32px 0px 32px;

  line-height: 32px;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
  }
`;

interface Header2Props {
  padded?: boolean;
}

export const Header2 = styled.h2<Header2Props>`
  font-family: "InstrumentSerif-Regular", serif;
  font-size: 24px;
  line-height: 24px;
  padding: ${(props) => (props.padded ? `0 32px 0px 32px` : `0px`)};

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
  }
`;

export const Header3 = styled.h2`
  font-family: "PlayfairDisplay-Medium", serif;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

export const Header4 = styled.h2`
  font-family: "PlayfairDisplay-Medium", serif;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
`;

export const Text = styled.span`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 18px;
  line-height: 22px;
`;
