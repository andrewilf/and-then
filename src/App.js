import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AppShell, Header, useMantineTheme } from "@mantine/core";
import { Button } from "@mantine/core";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NewPage from "./components/NewPage";
import AllPromptsPage from "./components/AllPromptsPage";
import CreateNodePage from "./components/CreateNodePage";
import PromptPage from "./components/PromptPage";
import ProfilePage from "./components/ProfilePage";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage";
import CreatePromptPage from "./components/CreatePromptPage";
import EditPromptPage from "./components/EditPromptPage";
import { LoginContext, adminContext, userContext } from "./global/context";

function App() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [quote, setQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const accessToken = localStorage.getItem("token");

  const updateQuote = async () => {
    // Fetch a random quote from the Quotable API
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setQuoteAuthor("- " + data.author);
    } catch (error) {
      setQuote("An error occured");
      console.log(error);
    }
  };

  const checkLogin = async () => {
    if (accessToken) {
      //  navigate("/signin");
      const response = await fetch(
        "https://and-then-backend.herokuapp.com/session/login",
        {
          method: "GET",
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const userDetails = {
          _id: data._id,
          role: data.role,
          username: data.username,
        };
        setUser(userDetails);
        setLoggedIn(true);
        if (data.role === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } else {
        console.log("token failed");
        setAdmin(false);
        setUser(false);
        setLoggedIn(false);
      }
    } else {
      navigate("iamnew");
      console.log("no access token found");
    }
  };

  useEffect(() => {
    console.log("starting app");
    let isMounted = true;

    if (isMounted) {
      updateQuote();
      checkLogin();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <userContext.Provider value={{ user, setUser }}>
        <adminContext.Provider value={{ admin, setAdmin }}>
          <AppShell
            padding="0"
            fixed="true"
            style={{ backgroundColor: theme.colors.dark[4] }}
            header={
              <Header
                height={90}
                padding="xl"
                style={{ backgroundColor: theme.colors.dark[5] }}
              >
                <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </Header>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/prompts" element={<AllPromptsPage />} />
              <Route path="/iamnew" element={<NewPage />} />
              <Route path="/createnode" element={<CreateNodePage />} />
              <Route path="/prompt" element={<PromptPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/signin"
                element={<SigninPage quote={quote} quoteAuthor={quoteAuthor} />}
              />
              <Route
                path="/signup"
                element={<SignupPage quote={quote} quoteAuthor={quoteAuthor} />}
              />
              <Route path="/createprompt" element={<CreatePromptPage />} />
              <Route path="/editprompt" element={<EditPromptPage />} />
            </Routes>
            <Footer />
          </AppShell>
        </adminContext.Provider>
      </userContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
