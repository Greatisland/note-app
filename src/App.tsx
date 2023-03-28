import { useState } from 'react'
import Main from './components/Main'
import Modify from './components/Modify'
import { createGlobalStyle } from "styled-components"
import styled from 'styled-components'

//media query
export const device = {
  laptop: `(max-width: 780px)`,
  phone: `(max-width: 480px)`,
}

//normalize
const GlobalStyle = createGlobalStyle`
  * {margin: 0; padding: 0; color: #333;}
  a {text-decoration: none;}
  ul, ol {list-style: none;}
  html, body {font-family: 'Roboto', sans-serif;}
`

const NoteBG = styled.div`
  background: #ebd3d3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
  height: 80%;
  @media ${device.laptop} {
    width: 70%;
  }
  @media ${device.phone} {
    width: 90%;
  }
  border-radius: 40px;
  background: #f2f2f2;
  box-shadow: 0px 0px 3px 2px #bdaeae;
  padding: 40px;
  box-sizing: border-box;
  h1 {
    font-weight: 500;
    font-family: 'Amatic SC', cursive;
    font-size: 60px;
    letter-spacing: 6px;
    text-align: center;
  }
  p {
    font-family: 'Amatic SC', cursive;
    letter-spacing: 2px;
    font-size: 20px;
    color: #666;
  }
`

const App = () => {
  const [renderComp, setRenderComp] = useState<boolean>(true)
  const isRender = () => setRenderComp(!renderComp)

  return (
    <NoteBG>
      <GlobalStyle />
      <NoteContainer>
        <h1>Notes App</h1>
        <p>You can create, modify, erase, and search notes.</p>
        {renderComp&&<Main isRender={isRender}></Main>}
        {!renderComp&&<Modify isRender={isRender}></Modify>}
      </NoteContainer>
    </NoteBG>
  )
}
export default App