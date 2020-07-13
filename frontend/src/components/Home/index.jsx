import React from "react";
import styled from "styled-components";

import Navbar from "./Navbar";
import Content from "./Content";

const HomeContainer = styled.div``;

export default function Home() {
  return (
    <HomeContainer>
      <Navbar />
      <Content />
    </HomeContainer>
  );
}
