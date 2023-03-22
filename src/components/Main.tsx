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
    const test = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)

      if (typeof value === "string" && value !== null && value !== undefined) {
        // try catch문 사용하면 parse되는데 그냥 작성할 경우 안됨. ?
        try {
          const jsonValue = JSON.parse(value)
          test.push(jsonValue)
        } catch (error) {
          console.error(`왜안돼냐: ${value}`)
        }
          // const jsonValue = JSON.parse(value)
          // test.push(jsonValue)
      }
    }
    setNoteDatas(test)
  }

  useEffect(()=>{
    renderNotes()
  }, [noteDatas])

  return (
    <>
      <form>
        <SearchBar type="search" placeholder="Please typing keyword this place."></SearchBar>
      </form>
      {
        noteDatas?.map((data, i) => (
          <NoteListContainer key={i}>
            <li>{`${data.title} / ${data.contents}`}</li>
          </NoteListContainer>
        ))
      }
    </>
  )
}

export default Main