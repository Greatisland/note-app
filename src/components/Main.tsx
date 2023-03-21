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
  const [noteData, setNoteData] = useState<NoteType []>()

  useEffect(() => {
    renderNotes()
  },[])

  const renderNotes = () => {
    let local = localStorage.getItem("솜사탕")

    if (local !== null) {
      const value = JSON.parse(local)
      setNoteData([value])
    }
  }


  return (
    <>
      <form>
        <SearchBar type="search" placeholder="Please typing keyword this place."></SearchBar>
      </form>
      {
        noteData?.map((data, i) => (
          <ul key={i}>
            <li>{`${data.title} / ${data.contents}`}</li>
          </ul>
          
        ))
      }
    </>
  )
}

export default Main