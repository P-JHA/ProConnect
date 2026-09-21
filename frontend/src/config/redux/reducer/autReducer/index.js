

const initalState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    loggedIn: false,
    profileFetched: false,
    connections: [],
    connectionRequests: [],
    message: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initalState,
    reducers: {
        reset: (state) => {
            return initalState;
        },
        handleLoginUser: (state) => {
            state.message = 'Hello, User!';
        },
    },
    extraReducers: (builder) => {

    }
});
