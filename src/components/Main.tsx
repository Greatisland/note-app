import { useEffect,useState } from "react"
import styled from "styled-components"
import { selectNote, createNote } from "./store"
import { useDispatch, useSelector } from "react-redux"

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

const NormalButton = styled.div`
  
`

interface NoteType {
  title : string,
  contents:string,
  date:string
}

interface IsRender {
  isRender: () => void
}


 const Main = (props: IsRender) => {

  let dispatch = useDispatch()

  const [noteDatas, setNoteDatas] = useState([])

  const renderNotes = () => {
    const data = localStorage.getItem('memoKey')
    if(data !== null && data !== undefined && typeof data === 'string') setNoteDatas(JSON.parse(data))
  }

  const allDelete = () => {
    localStorage.clear()
    setNoteDatas([])
  }

  const selectNotes = (e) => {
    const index = e.target.getAttribute('id')
    const title = noteDatas[index].title
    const contents = noteDatas[index].contents
    const date = noteDatas[index].date
    dispatch(selectNote({index,title,contents,date}))
    props.isRender()
  }

  const createNotes = () => {
    dispatch(selectNote({title: '', contents: '', index: '', date: ''}))
    props.isRender()
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
          <NoteListContainer key={i} onClick={selectNotes}>
            <li id={i}>{`${data.title} / ${data.contents} / ${data.date}`}</li>
          </NoteListContainer>
        ))
      }
      <div onClick={allDelete}>all delete</div>
      <NormalButton onClick={createNotes}>Create</NormalButton>
    </>
  )

}

export default Main