import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTopTop";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop>
          <main>
            <StoreProvider>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/success" component={Success} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/orderHistory" component={OrderHistory} />
                <Route exact path="/products/:id" component={Detail} />
                <Redirect from="*" to="/" />
                {/* <Route component={NoMatch} /> */}
              </Switch>

              <Footer />
            </StoreProvider>
          </main>
        </ScrollToTop>
      </Router>
    </ApolloProvider>
  );
}

export default App;
