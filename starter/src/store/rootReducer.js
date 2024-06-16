import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import user from './slices/userSlice'
import task from './slices/taskSlice'
import link from './slices/linkSlice'
import charge from './slices/chargeSlice'
const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        user,
        task,
        link,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
