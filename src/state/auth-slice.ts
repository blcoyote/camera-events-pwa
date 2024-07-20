import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
    isAuthenticated: boolean;
    user: User | undefined;
    token: string | undefined;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: undefined,
    token: undefined
};

interface  User {
    userId?: string
    email?: string
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string|undefined>){
            state.token = action.payload
        },

        logout(state) {
            state.isAuthenticated = false;
            state.user = undefined;
            state.token = undefined
        },
        // Add any other authentication-related reducers here
    },
});

export const { login, logout, setToken } = authSlice.actions;
export const getToken = (state: RootState) => state.auth.token;
export const getUser = (state: RootState) => state.auth.user;

export const authState = (state: RootState) => state.auth;
export default authSlice.reducer;