import { useState } from 'react'
import styled from "styled-components"
import { useSelector } from "react-redux"
import { NormalButton, ButtonContainer } from './Main'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 0;
  gap: 20px;
`

const cssArea = `
  display: block;
  padding: 10px 20px;
  width: calc(100% - 40px);
  border: none;
  letter-spacing: 0.06em;
  border-radius: 6px;
  :focus {
    outline: none;
  }
`

const TitleArea = styled.input`
  ${cssArea}
`

const ContentArea = styled.textarea`
  ${cssArea}
  height: 100%;
  resize: none;
  line-height: 25px;
`

interface Props {
  IsRender: IsRender
  SelectValue: {}
}

interface IsRender {
  isRender: () => void
}

 const Modify = (props: Props) => {
  const state = useSelector(state => state.cart)
  const [title, setTitle] = useState(state.title)
  const [contents, setContents] = useState(state.contents)

  const handlerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let dataBase = []

    const date: string = 
    new Date().getFullYear().toString() +'.'+ (new Date().getMonth()+1).toString().padStart(2,'0') 
    +'.'+ new Date().getDate().toString()
    const currentDB = {title, contents, date}
    
    //기존 로컬스토리지 값을 빈 배열인 dataBase로 옮겨담음
    const data = localStorage.getItem('memoKey')
    if(data !== null && data !== undefined && typeof data === 'string'){
      dataBase.push(...JSON.parse(data))
    }

    //존재하는 노트 수정일 경우
    if(state.index){
      //delete는 현재 노트값 삭제
      if(e.target.value === 'del'){
        dataBase.splice(state.index, 1)
      }else{
      //수정 후 데이터베이스 추가 
        dataBase.splice(state.index, 1, currentDB)
      }

      const jsonDB = JSON.stringify(dataBase)
      localStorage.setItem(`memoKey`, jsonDB)
      props.isRender()

    //새노트 추가일 경우
    }else if(title !== state.title && contents !== state.contents){
      //delete는 현재 작성내용을 초기화시키는 역할부여
      if(e.target.value === 'del'){
        setTitle('')
        setContents('')
        return
      }

      //현재 입력값을 dataBase에 추가한 후 다시 로컬스토리지에 추가
      dataBase.push(currentDB)
      const jsonDB = JSON.stringify(dataBase)
      localStorage.setItem(`memoKey`, jsonDB)
      props.isRender()
    }
  }

  return (
    <>
      <Form onSubmit={handlerFormSubmit}>
        <TitleArea type="text" value={title} onChange={(e)=> setTitle(e.target.value)}></TitleArea>
        <ContentArea value={contents} onChange={(e) => setContents(e.target.value)}></ContentArea>
        <NormalButton>Done</NormalButton>
      </Form>
      <ButtonContainer>
        <NormalButton onClick={props.isRender}>Back</NormalButton>
        <NormalButton value={'del'} onClick={handlerFormSubmit}>Delete</NormalButton>
      </ButtonContainer>
    </>
  )
}
export default Modify