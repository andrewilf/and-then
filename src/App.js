import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AppShell, Header, useMantineTheme } from "@mantine/core";
import { Button } from "@mantine/core";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NewPage from "./components/NewPage";
import AllPromptsPage from "./components/AllPromptsPage";
import CreateNodePage from "./components/CreateNodePage"
import PromptPage from "./components/PromptPage"
import ProfilePage from "./components/ProfilePage";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage";
import CreatePromptPage from "./components/CreatePromptPage";

function App() {
  const theme = useMantineTheme();
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <AppShell
      padding="0"
      fixed="true"
      style={{ backgroundColor: theme.colors.dark[4]}}
      header={
        <Header
          height={80}
          padding="xl"
          style={{ backgroundColor: theme.colors.dark[5] }}
        >
          <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Header>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prompts" element={<AllPromptsPage />} />
        <Route path="/iamnew" element={<NewPage />} />
        <Route path="/createnode" element={<CreateNodePage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createprompt" element={<CreatePromptPage />} />
      </Routes>
      <Footer />
    </AppShell>
  );
}

export default App;
