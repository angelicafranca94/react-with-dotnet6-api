import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Book from "./pages/Book";
import Login from './pages/Login'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/book" component={Book}/>
            </Switch>
        </BrowserRouter>
    );
}