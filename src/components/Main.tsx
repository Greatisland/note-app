import { useEffect,useState } from "react"
import styled from "styled-components"

const SearchBar = styled.input`
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  :focus {
    border: none;
    outline: none;
  }
`

const NoteListContainer = styled.ul`

`

interface NoteType {
  title : string,
  contents:string,
  date:string
}


 const Main = () => {
  
  const [noteDatas, setNoteDatas] = useState([])

  const renderNotes = () => {
    const data = localStorage.getItem('memoKey')
    if(data !== null && data !== undefined && typeof data === 'string') setNoteDatas(JSON.parse(data))
  }

  useEffect(()=>{
    renderNotes()
  }, [])

  return (
    <>
      <form>
        <SearchBar type="search" placeholder="Please typing keyword this place."></SearchBar>
      </form>
      {
        noteDatas?.map((data, i) => (
          <NoteListContainer key={i}>
            <li>{`${data.title} / ${data.contents} / ${data.date}`}</li>
          </NoteListContainer>
        ))
      }
    </>
  )
}

export default Main