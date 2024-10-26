// authorSlice.ts
import { IUserState } from "@/types/iuser";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUserState = {
    user_id: 0,
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<IUserState>) => {
            const { user_id, first_name, last_name, role, profile_picture } = action.payload;
            state.user_id = user_id;
            state.first_name = first_name;
            state.last_name = last_name;
            state.role = role;
            state.profile_picture = profile_picture;
        },
        logoutAction: (state) => {
            state.user_id = 0;
            state.first_name = "";
            state.last_name = "";
            state.role = "";
            state.profile_picture = "";
        }
    }
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
