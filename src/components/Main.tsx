import { useEffect } from "react"
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

export default function Main() {
  let DB = []
  useEffect(() => {
    // renderNotes()
  }, [])

  function renderNotes(){
    for(let i=0; i<window.localStorage.length; i++){
      let key = window.localStorage.key(i)
      DB[i] = [key, '']
      let value = window.localStorage.getItem(key)
      console.log(value)
    }
    console.log(DB)
  }

  renderNotes()


  return (
    <>
      <form>
        <SearchBar type="search" placeholder="Please typing keyword this place."></SearchBar>
      </form>
      {/* {DB?.map((value, i) => (
        <NoteListContainer>
          <li key={i}>{value}</li>
        </NoteListContainer>
      ))} */}
      
    </>
  )
}