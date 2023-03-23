import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { selectNote } from "./store"
import { useDispatch } from "react-redux"

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

const NoteListContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  ul {
    cursor: pointer;
    li {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 15px;
      }
      strong {
        font-size: 13px;
        font-weight: 400;
        color: #494646;
      }
    }
  }
`

const NormalButton = styled.div`
  
`
interface IsRender {
  isRender: () => void
}

 const Main = (props: IsRender) => {

  let dispatch = useDispatch()

  const [noteDatas, setNoteDatas] = useState([])
  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState('')

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

  const searchKeyword = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(keyword)
    renderNotes()
  }
  
  useEffect(()=>{
    renderNotes()
  }, [])

  console.log(noteDatas)

   return (
     <>
      <form onSubmit={searchKeyword}>
        <SearchBar type="search" onChange={(e) => setKeyword(e.target.value)} placeholder="Please typing keyword this place."></SearchBar>
      </form>
      <NoteListContainer>
        {noteDatas?.map((data, i) => (
          <ul key={i} onClick={selectNotes}>
            {data.title.includes(search)?<li id={i}><span>{data.title}</span><strong>{data.date}</strong></li>:null}
          </ul>
        ))}
      </NoteListContainer>
      <div onClick={allDelete}>all delete</div>
      <NormalButton onClick={createNotes}>Create</NormalButton>
    </>
  )
}
export default Main