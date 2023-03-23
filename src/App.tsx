import { useState } from 'react'
import Main from './components/Main'
import Modify from './components/Modify'
import { createGlobalStyle } from "styled-components"
import styled from 'styled-components'
import { render } from 'react-dom'

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
  width: 70%;
  height: 80%;
  border-radius: 40px;
  background: #f2f2f2;
  box-shadow: 0px 0px 3px 2px #bdaeae;
  padding: 40px;
  box-sizing: border-box;
  h1 {
    font-weight: 500;
  }
  p {
    font-weight: 400;
    color: #666;
  }
`

function App() {
  const [renderComp, setRenderComp] = useState<boolean>(true)
  const isRender = () => setRenderComp(!renderComp)

  return (
    <NoteBG>
      <GlobalStyle />
      <NoteContainer>
        <h1 onClick={isRender}>Notes App</h1>
        <p>You can create, modify, erase, and search notes.</p>
        {renderComp&&<Main isRender={isRender}></Main>}
        {renderComp||<Modify isRender={isRender}></Modify>}
      </NoteContainer>
    </NoteBG>
  )
}
export default App