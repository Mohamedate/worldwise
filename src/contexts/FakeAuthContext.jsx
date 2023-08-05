import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payloads, isAuth: true };
    case "logout":
      return { ...initialState };
    default:
      throw new Error("unkown action");
  }
}

const initialState = {
  user: null,
  isAuth: false,
};

const FAKE_USER = {
  name: "Mohamed",
  email: "m@gmial.com",
  password: "12345",
};

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payloads: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("out side the context");
  return context;
}

export { useAuth, AuthProvider };
