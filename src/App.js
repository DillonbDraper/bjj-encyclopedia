import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import './App.css';
import { AppViews } from "./components/AppViews";

function App() {
  return (
<>
    <Route render={() => {
      // The user id is saved under the key app_user_id in local Storage. Change below if needed!
        if (localStorage.getItem("grappler")) {
            return (
              <>
                <AppViews />
              </>
            )
        } else {
            return <Redirect to="/login" />
        }
    }} />

    <Route path="/login" render={props => <Login {...props} />} />
    <Route path="/register" render={props => <Register {...props} />} />
</>
  )
}

export default App;
