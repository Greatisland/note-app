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
  padding: 2px 10px;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #e99797;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  
  ul {
    cursor: pointer;
    li {
      padding: 12px 10px;
      display: flex;
      justify-content: space-between;
      :hover {
        background: #e99797;
      }
      span {
        font-size: 15px;
        color: #444;
        letter-spacing: 0.08em;
      }
      strong {
        font-size: 13px;
        font-weight: 400;
        color: #494646;
        letter-spacing: 0.08em;
      }
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const NormalButton = styled.button`
  cursor: pointer;
  border: none;
  font-family: 'Amatic SC', cursive;
  letter-spacing: 4px;
  text-align: center;
  font-size: 22px;
  padding: 7px 14px;
  border-radius: 10px;
  background: #e99797;
  color: #fff;
  :hover {
    background: #cc7777;
  }
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
    const index = e.target.getAttribute('id')||e.target.parentNode.getAttribute('id')
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
      <ButtonContainer>
        <NormalButton onClick={createNotes}>Create</NormalButton>
        <NormalButton onClick={allDelete}>All Delete</NormalButton>
      </ButtonContainer>
    </>
  )
}
export default Main