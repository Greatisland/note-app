import { useState } from 'react'
import styled from "styled-components"
import { useSelector } from "react-redux"
import { NormalButton, ButtonContainer } from './Main'
import Swal from "sweetalert2"

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
        Swal.fire({
          title: '정말로 이 노트를 삭제할까요?',
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
              너의 노트. 아주 깔끔하게 사라졌다.
              `,
              showConfirmButton: false,
              timer: 1000
            })

            dataBase.splice(state.index, 1)
            const jsonDB = JSON.stringify(dataBase)
            localStorage.setItem(`memoKey`, jsonDB)
            props.isRender()
            return
          }else{
            return
          }
        })
      }else{
      //수정 후 데이터베이스 추가 
        dataBase.splice(state.index, 1, currentDB)
        Swal.fire({
          icon: 'success',
          title: '노트 수정 완료!',
          showConfirmButton: false,
          timer: 800
        })
        const jsonDB = JSON.stringify(dataBase)
        localStorage.setItem(`memoKey`, jsonDB)
        props.isRender()
        return
      }

    //새 노트 추가일 경우
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
      Swal.fire({
        icon: 'success',
        title: '노트 추가 성공!',
        html: `
        새 노트가 추가되었어요!
        `,
        showConfirmButton: false,
        timer: 1000
      })
      return
    }
    if(e.target.value !== 'del'){
      Swal.fire({
        html: `
        제목과 내용을 모두 입력해주세요!
        `,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: "알겠습니다...",
      })
    }
  }

  return (
    <>
      <Form onSubmit={handlerFormSubmit}>
        <TitleArea type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="제목을 입력해주세요..."></TitleArea>
        <ContentArea value={contents} onChange={(e) => setContents(e.target.value)} placeholder="내용을 입력해주세요..."></ContentArea>
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