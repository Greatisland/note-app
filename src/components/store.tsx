import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface NoteState {
  title: string
  index: string
  contents: string
  date: string
}

interface RootState {
  cart: NoteState
}


let cart = createSlice({
  name: 'cart',
  initialState: {
    title: '',
    index: '',
    contents: '',
    date: ''
  } as NoteState,
  reducers: {
    selectNote(state, action: PayloadAction<NoteState>){
      state.title = action.payload.title
      state.index = action.payload.index
      state.contents = action.payload.contents
      state.date = action.payload.date
    },
  }
})

export let { selectNote } = cart.actions
const store = configureStore({
  reducer : {
    cart: cart.reducer,
  }
})

export default store
export type { NoteState, RootState }