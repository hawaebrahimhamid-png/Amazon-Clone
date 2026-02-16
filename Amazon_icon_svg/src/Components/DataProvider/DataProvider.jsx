// import React, { createContext, useReducer } from "react";
// import { initialState, reducer } from "../../Utility/Reducer";

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   return (
//     <DataContext.Provider value={useReducer(reducer, initialState)}>
//       {children}
//     </DataContext.Provider>
//   );
// };
import React, { createContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "../../Utility/Reducer";
import { auth } from "../../Utility/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Type } from "../../Utility/Action.type";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: Type.SET_USER,
        user: user,
      });
    });
  }, []);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
