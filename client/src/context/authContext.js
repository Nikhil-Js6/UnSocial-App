import { createContext, useReducer, useEffect } from 'react';
import AuthReducer from './authReducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("unsocialUser")) || null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
     const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

     useEffect(() => {
                 // Storing the user in local Storage as JSON object
      localStorage.setItem("unsocialUser", JSON.stringify(state.user));

      }, [state.user]);

     return (
       <AuthContext.Provider
           value={{
              user: state.user,
              isFetching: state.isFetching,
              error: state.error,
              dispatch,
           }}
       >
          {children}
       </AuthContext.Provider>
     );
}
