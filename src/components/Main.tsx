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

interface Notes {

}

interface NoteType {
  title : string,
  contents:string,
  date:string
}



 const Main = () => {
  let test = []
  let noteDatas = []

  const renderNotes = () => {

    for(let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i)
      let value = localStorage.getItem(key)
      if(value !== null && value !== undefined){
        // let jsonValue = JSON.parse(value)
        test.push([key,value])
      }
    }
    noteDatas = test.map((value, i) => {
      try {
        let jsonValue = JSON.parse(value[1]);
        return jsonValue
      } catch (e) {
        console.error(`Failed to parse JSON string: ${value[1]}`);
      }
    })
    // let local = localStorage.getItem("솜사탕")
    // if (local !== null) {
    //   const value = JSON.parse(local)
    //   setNoteData([value])
    // }
  }
  
  renderNotes()
  console.log(noteDatas)

  return (
    <>
      <form>
        <SearchBar type="search" placeholder="Please typing keyword this place."></SearchBar>
      </form>
      {
        noteDatas?.map((data, i) => (
          <ul key={i}>
            <li>{`${data.title} / ${data.contents}`}</li>
          </ul>
        ))
      }
    </>
  )
}

export default Main