import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useState ,useEffect} from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import EditTweet from "./components/edit-tweet";
const router = createBrowserRouter(
  [
    {
      path : "/",
      element : <ProtectedRoute><Layout /></ProtectedRoute>,
      children : [
        {
          path : "",
          element : <Home />,
        },
        {
          path : "profile",
          element : <Profile />,
        }
      ]
    },
    {
      path : "/login",
      element : <Login />,
    },
    {
      path : "/create-account",
      element : <CreateAccount />,
    },
    {
      path : "/edit-tweet/:id",
      element : <EditTweet />,
    }
  ]
);

const GlobalStyles = createGlobalStyle`
   ${reset};
   * {
     box-sizing: border-box;
   }
   body {
     background-color: black;
     color:white;
     font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   }
 `;

function App() {
  const [isLoading,setLoading] = useState(true);
  const init = async ()=>{

    await auth.authStateReady();
    setLoading(false);
  }

  useEffect(()=>{
    init();
  },[]);

  return(
  <>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </>
  );
}

export default App;
