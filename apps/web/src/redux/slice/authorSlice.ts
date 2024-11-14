import { deleteToken } from "@/lib/server";
import { IUserState } from "@/types/iuser";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState extends IUserState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user_id: 0,
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: "",
    isAuthenticated: false,
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
            state.isAuthenticated = true;
        },
        logoutAction: (state) => {
            state.user_id = 0;
            state.first_name = "";
            state.last_name = "";
            state.role = "";
            state.profile_picture = "";
            state.isAuthenticated = false;
            localStorage.clear();
            deleteToken();
        }
    }
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
