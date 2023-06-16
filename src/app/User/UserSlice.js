import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    name:'',
    email:'',
    verified:false
}
export const userSlice = createSlice({
    name :'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
        
                    state.name      = action?.payload?.family_name+action?.payload?.given_name
                    state.email = action?.payload?.email
                    state.verified = action?.payload?.email_verified
                }
    }
})

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//      name:'',
//      email:'',
//      verified:false
//   },
//   reducers: {
  
  
//     setUser:(state,action)=>{
//         state.name += action?.payload?.family_name+action?.payload?.given_name
//         state.email = action?.payload?.email
//         state.verified = action?.payload?.email_verified
//     }
    
//   },
// })
export const { setUser} = userSlice.actions

export const selectUser = (state) => state.user


export default userSlice.reducer
