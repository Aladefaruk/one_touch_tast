/** @format */

import React, { useReducer, useState } from "react";
import MkdSDK from "Utils/MkdSDK";
import { useNavigate } from "react-router-dom";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : null,
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
};

export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      let data = action.payload;
      localStorage.setItem("user_data", JSON.stringify(data));
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      return {
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      window.location.href = "/" + "admin" + "/login";
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        role: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();
export const tokenExpireError = (dispatch, errorMessage) => {
  let role = JSON.parse(localStorage.getItem("role"));
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    //TODO
    const checkAuthStatus = async () => {
      console.log(window.location.pathname);

      const user_data = JSON.parse(localStorage.getItem("user_data"));
      if (user_data && user_data.token) {
        try {
          const response = await sdk.check(user_data.role, "check");
          if (response.error) {
            tokenExpireError(dispatch, "TOKEN_EXPIRED");
          } else {
            dispatch({
              type: "LOGIN",
              payload: user_data,
            });
          }
        } catch (error) {
          tokenExpireError(dispatch, "TOKEN_EXPIRED");
        }
      }
      setLoading(false);
    };

    if (loading) {
      checkAuthStatus();
    }
  }, [loading, navigate]);

  if (loading) {
    return <div>loading..</div>;
  }

  return loading ? (
    <div>loading..</div>
  ) : (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
