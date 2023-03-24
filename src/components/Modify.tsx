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

    //index값이 존재할 경우(수정)해당 index요소 제거후 새 값 추가 및 로컬스토리지에도 추가
    if(state.index){
      
      if(e.target.value === 'del'){
        dataBase.splice(state.index, 1)
      }else{
        dataBase.splice(state.index, 1, currentDB)
      }

      const jsonDB = JSON.stringify(dataBase)
      localStorage.setItem(`memoKey`, jsonDB)
      props.isRender()

    }else if(title !== state.title && contents !== state.contents){
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
        <NormalButton value={'del'} onClick={handlerFormSubmit}>delete</NormalButton>
      </ButtonContainer>

    </>
  )
}
export default Modify