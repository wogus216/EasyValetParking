import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getPayload, isValidToken, setSession } from 'src/utils/jwt';

import { urls, jsonHeader, headers } from 'src/libs/reqConf';

// 초기값
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return { ...state, isAuthenticated, isInitialized: true, user };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  },
  REGISTER: (state, action) => {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  postForgotPassword: () => Promise.resolve(),
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // 자동로그인 검사
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        // const remember = window.localStorage.getItem('remember');

        // 자동 로그인 문자열 변환(Boolean)
        // const rememberCheck = (() => remember === 'true')();

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const user = getPayload(accessToken);

          dispatch({ type: 'INITIALIZE', payload: [{ isAuthenticated: true, user }] });
        } else {
          dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, user: null } });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, user: null } });
      }
    };

    initialize();
  }, []);

  // 로그인
  const login = async (params) => {
    const { email, password } = params;

    const url = `${urls.user}/sign-in`;
    const body = { email, password };
    const config = jsonHeader();

    const response = await axios.post(url, body, config);

    const { jwt } = response.data.data;
    const user = getPayload(jwt);

    setSession(jwt);
    dispatch({ type: 'LOGIN', payload: { user } });
  };

  // 회원 가입
  const register = async (params) => {
    const url = `${urls.user}`;
    const body = params;
    const config = jsonHeader();

    const response = await axios.post(url, body, config);
    const { jwt } = response.data.data;
    const user = getPayload(jwt);

    setSession(jwt, true);
    dispatch({ type: 'REGISTER', payload: { user } });
  };

  // 비밀번호 유실
  const postForgetPassword = async (params) => {
    const url = `${urls.user}/forgotPassword`;
    const body = params;
    const config = jsonHeader();

    const response = await axios.post(url, body, config);

    dispatch({ type: 'FORGOT_PASSWORD' });
  };

  // 비밀번호 변경(인증 전)
  // const patchResetPassword = async (params) => {
  //   const { password, passwordConfirm, token } = params;
  //   const url = `${urls.user}/resetPassword`;
  //   const body = { password, passwordConfirm };
  //   const config = { headers: headers(token) };
  //   console.log('body: ', body);
  //   console.log('config: ', config);

  //   const response = await axios.patch(url, body, config);
  //   console.log('response: ', response);

  //   dispatch({ type: 'RESET_PASSWORD' });
  // };

  // 로그 아웃
  const logout = async () => {
    setSession(null, null);
    dispatch({ type: 'LOGOUT' });
  };

  AuthProvider.propTypes = {
    children: PropTypes.node,
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        postForgetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
