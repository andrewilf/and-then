import { Text, Group, Anchor, Image } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/and then logo.png";
import { LoginContext, adminContext, userContext } from "../global/context";
import { useContext, useEffect, useState } from "react";

const NavigationBar = (props) => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  //const [randomPromptID, setRandomPromptID] = useState("");
  const navigate = useNavigate();

  // useEffect(async () => {
  //   setRandomPromptID(await props.getRandomPrompt());
  // }, []);
  return (
    <div>
      {/* <Text color="MantineColor" size="md">Default text</Text>
      <Text size="md">Default text</Text> */}
      <Group position="apart">
        <Anchor component={Link} variant="text" to="/">
          <Image alt="and then logo" src={logo} height={"52px"} />
        </Anchor>
        <Anchor
          // component={Link}
          variant="text"
          // to={`/prompt/${randomPromptID}`}
          onClick={() => {
            props.getRandomPrompt()
            navigate(`/prompt/${props.randomPromptID}`);
          // window.location.reload(false);
          }}
        >
          Random Prompt
        </Anchor>
        <Anchor component={Link} variant="text" to="/prompts">
          Prompts
        </Anchor>
        <Anchor component={Link} variant="text" to="/iamnew">
          I am New
        </Anchor>
        <Anchor component={Link} variant="text" to="/about">
          About
        </Anchor>
        <div style={{ display: "flex" }}>
          {props.loggedIn ? (
            <Group>
              <div
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor: "rgb(104, 104, 137)",
                  textAlign: "center",
                  marginRight: "9px",
                }}
              >
                <Text component={Link} to="/profile">
                  {user.username[0].toUpperCase()}
                </Text>
              </div>
              <Text component={Link} to="/profile">
                {user.username}
              </Text>
              <Text> | </Text>
              <Text
                component={Link}
                to="/iamnew"
                onClick={() => {
                  setLoggedIn(false);
                  setAdmin(false);
                  setUser(false);
                  localStorage.removeItem("token");
                  console.log("Logged out");
                }}
              >
                Logout
              </Text>
            </Group>
          ) : (
            <Group>
              <Text component={Link} to="/signin">
                Login
              </Text>
              <Text> | </Text>
              <Text component={Link} to="/signup">
                Sign up
              </Text>
            </Group>
          )}
        </div>
      </Group>
    </div>
  );
};

export default NavigationBar;
