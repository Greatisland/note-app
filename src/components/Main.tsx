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


// 타입 지정 까먹으면 안되요 ^_^
interface NoteType {
  title : string,
  contents:string,
  date:string
}

// 함수작명은 테스트로 할지언정 무조건 ES6 문법을 꼭 따라서 작성해주는 습관을 키워주시는게 좋아요 !

 const Main = () => {
  const local = localStorage.getItem("솜사탕")
  const [noteData, setNoteData] = useState<NoteType []>()

  useEffect(() => {
    renderNotes()
  }, [])

  // 현재 음 간단한 오류 이슈가 있어요. 데이터를 저장하고 맵핑은 잘되지만 실시간으로 리렌더링이 일어나지 않고 있습니다.
  // 리액트의 아주 간단한 기초적인 해결방식이니 이부분은 현진씨가 한번 풀어보았으면 합니다 !

  /** 
   * 그리고 로컬스토리지는 굳이 window.localStorage 이렇게 작성안해도 되요 !
   * 
   * 1. localStorage.setItem(키명, 밸류) 
   * 2. localStorage.getItem(키명)
   * 이렇게 작성하는게 좀 더 편하실껍니다
  */
  const renderNotes = () => {
    // 로컬의 아이템이 있는지 없는지 우선 확인함 만약 null 아니라면 해당 아이템을 파싱
    if (local !== null) {
      const value = JSON.parse(local)
      // 파싱한 아이템을 setState 배열함수에 저장 그리고 그 배열저장된 아이템을 이제 맵핑 ~
      setNoteData([value])
    }
   }

   console.log(noteData)

  return (
    <>
      <form>
        <SearchBar type="search" placeholder="Please typing keyword this place."></SearchBar>
      </form>
      {
        noteData?.map((data, i) => (
          <ul key={data.date}>
            <li >{`${data.title} / ${data.contents}`}</li>
          </ul>
          
        ))
      }
    </>
  )
}

export default Main