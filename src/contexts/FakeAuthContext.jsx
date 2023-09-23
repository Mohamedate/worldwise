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

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(name, email) {
    const fake_user = {
      name: name,
      email: email,
    };

    dispatch({ type: "login", payloads: fake_user });
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
