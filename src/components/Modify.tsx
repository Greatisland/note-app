import React from "react"
import { useState } from 'react'
import styled from "styled-components"

const TitleArea = styled.input`
  
`

const ContentArea = styled.textarea`
  
`

 const Modify = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

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

    //현재 입력값을 dataBase에 추가한 후 다시 로컬스토리지에 추가
    dataBase.push(currentDB)
    const jsonDB = JSON.stringify(dataBase)
    localStorage.setItem(`memoKey`, jsonDB)
  }

  return (
    <>
      <form onSubmit={handlerFormSubmit}>
        <TitleArea type="text" onChange={(e)=> setTitle(e.target.value)}></TitleArea>
        <ContentArea onChange={(e) => setContents(e.target.value)}></ContentArea>
        <button>Done</button>
      </form>
    </>
  )
}
export default Modify