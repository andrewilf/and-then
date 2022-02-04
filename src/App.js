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
function App() {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      fixed="true"
      style={{ background: theme.colors.dark[4] }}
      header={
        <Header
          height={80}
          padding="xl"
          style={{ background: theme.colors.dark[5] }}
        >
          <NavigationBar />
        </Header>
      }
    >
      <Button variant="filled">yes</Button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prompts" element={<AllPromptsPage />} />
        <Route path="/iamnew" element={<NewPage />} />
      </Routes>
      <Footer />
    </AppShell>
  );
}

export default App;
