import { configureStore } from '@redux/toolkit';
import authReducer from './reducer/autReducer';


export const store = configureStore ({
    reducer: {
        auth: authReducer
    }
})

