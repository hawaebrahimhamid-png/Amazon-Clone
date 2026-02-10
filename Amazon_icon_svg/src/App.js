import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { auth } from "./Utility/Firebase"; // ✅ import auth
import { Type } from "./Utility/Action.type";
// ✅ import Type

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe(); // ✅ cleanup
  }, [dispatch]);

  return <Routing />;
}

export default App;
