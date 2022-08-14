import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Board from '../components/Board';

const Home: NextPage = () => {
  return (
    <MainWrapper>
      <Head>
        <title>2048</title>
        <meta name="description" content="Creating the 2048 game" />
        <link rel="icon" type="image/x-icon" href="2048.ico"></link>
        <style>
          {`
            html, body {
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Head>

      <main>
        <Board cells={4}></Board>
      </main>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: -webkit-fill-available;
  -webkit-overflow-scrolling: auto;
  touch-action: none;
`;

export default Home;
