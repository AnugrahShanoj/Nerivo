import { createSlice } from "@reduxjs/toolkit";

const connectionSlice= createSlice({
    name:"connection",
    initialState: null,
    reducers:{
        addConnections:(store, action)=>{
            return action.payload;
        },
        removeConnections: ()=>{
            return null;
        }
    }
})

export const {addConnections, removeConnections} = connectionSlice.actions;

export default connectionSlice.reducer;