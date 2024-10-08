import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "./UserAuthForm";
import { createContext } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor"
import Home from "./pages/Home";

export const UserContext = createContext({});

const App = () => {

  const[userAuth, setUserAuth] = useState({});

  useEffect(()=>{
    let userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token : null})
  }, [])

    return(
      <>
        <UserContext.Provider value = {{userAuth, setUserAuth}}>
          <Routes>
            <Route path = "/editor" element = {<Editor/>}></Route>
            <Route path="/" element={<Navbar/>}>
              <Route index element={<Home/>}/>
              <Route path="user/signin" element={<UserAuthForm type="sign-in"/>}/>
              <Route path="user/signup" element={<UserAuthForm type="sign-up"/>}/>
            </Route>
          </Routes>
        </UserContext.Provider>
      </>
    );
};

export default App;
