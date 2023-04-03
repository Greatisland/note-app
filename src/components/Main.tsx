import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { selectNote } from "./store"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

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

interface NoteData {
  title: string
  contents: string
  date: string
}

interface IsRender {
  isRender: () => void
}

 const Main = (props: IsRender) => {

  let dispatch = useDispatch()

  const [noteDatas, setNoteDatas] = useState<NoteData[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [search, setSearch] = useState<string>('')


  //전체 노트 데이터 가져오기
  const renderNotes = () => {
    const data = localStorage.getItem('memoKey')
    if(data !== null && data !== undefined && typeof data === 'string') setNoteDatas(JSON.parse(data))
  }

  //전체 노트 삭제
  const allDelete = () => {
    Swal.fire({
      title: '노트를 전부 삭제할까요?',
      text: "한번 삭제하면 되돌릴 수 없어용!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '그래! 지워버려~',
      cancelButtonText: '시러~'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제완료',
          html: `
          너의 노트. 아주 깔끔하게 싹 사라졌다.
          `,
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.removeItem('memoKey')
        setNoteDatas([])
      }
    })

  }

  //현재 선택한 노트로 이동
  const selectNotes = (e: React.MouseEvent<HTMLElement>) => {
    const index: string | null = (e.target as HTMLElement).getAttribute('id')||(e.target.parentNode as HTMLElement).getAttribute('id')
    const title = noteDatas[index].title
    const contents = noteDatas[index].contents
    const date = noteDatas[index].date
    dispatch(selectNote({index,title,contents,date}))
    props.isRender()
  }

  //노트 생성창으로 이동
  const createNotes = () => {
    dispatch(selectNote({title: '', contents: '', index: '', date: ''}))
    props.isRender()
  }

  //검색 후 해당 노트리스트 리렌더링
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
            {data.title.includes(search)?<li id={i.toString()}><span>{data.title}</span><strong>{data.date}</strong></li>:null}
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