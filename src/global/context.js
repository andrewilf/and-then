import { createContext } from "react";

const LoginContext = createContext({});
const adminContext = createContext({});
const userContext = createContext({});
const recentPromptContext = createContext({});

export { LoginContext, adminContext, userContext, recentPromptContext };
