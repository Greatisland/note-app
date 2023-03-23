import {configureStore, createSlice} from "@reduxjs/toolkit"

let note = createSlice({
  name: 'note',
  initialState: {
    title: '',
    index: '',
    contents: '',
    date: ''
  },
  reducers: {
    selectNote(state, action){
      state.title = action.payload.title
      state.index = action.payload.index
      state.contents = action.payload.contents
      state.date = action.payload.date
      console.log(state.index)
    },
  }
})

export let {selectNote} = note.actions
const store = configureStore({
  reducer : {
    cart: note.reducer,
  }
})
export default store
