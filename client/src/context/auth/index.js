import { createContext, useContext, useReducer } from 'react';
import jwtDecode                                 from 'jwt-decode';

const LS_KEY       = 'jwtToken';
const authConstant = {
  LOGIN:  'LOGIN',
  LOGOUT: 'LOGOUT',
};

const initialState = {user: null};

if (window.localStorage.getItem(LS_KEY)) {
  const decodeToken = jwtDecode(window.localStorage.getItem(LS_KEY));

  if (decodeToken.exp * 1000 < Date.now()) {
    window.localStorage.removeItem(LS_KEY);
  } else {
    initialState.user = decodeToken;
  }
}

const AuthContext = createContext({});

const authReducer = (state, action) => {
  switch (action.type) {
    case authConstant.LOGIN:
      return {...state, user: action.payload};
    case authConstant.LOGOUT:
      return {...state, user: null};
    default:
      return state;
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(data.token));
    dispatch({type: authConstant.LOGIN, payload: data});
  };

  const logout = () => {
    window.localStorage.removeItem(LS_KEY);
    dispatch({type: authConstant.LOGOUT});
  };

  return (
    <AuthContext.Provider value={{user: state.user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);