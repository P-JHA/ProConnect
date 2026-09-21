

export const loginUser = createAsyncThunk(
    "user/login", 
    async (user, thunkAPI) => {   
    try {  
        const response = await clientServer.post(`/login`, {
            email: user.email,
            password: user.password,
        });

        if (response.data.token !== 200) {
            localStorage.setItem("token", response.data.token);
       
        }else{
            return thunkAPI.rejectWithValue({ message: "Token Not Provided" });
        }
        return thunkAPI.fulfillWithValue(response.data.token);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);   
    }
}
);
