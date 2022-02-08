import { Text, Group, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

const NavigationBar = (props) => {
  return (
    <div>
      {/* <Text color="MantineColor" size="md">Default text</Text>
      <Text size="md">Default text</Text> */}
      <Group position="apart">
        <Anchor component={Link} variant="text" to="/">
          logo here
        </Anchor>
        <Anchor component={Link} variant="text" to="/prompt">
          Random Prompt
        </Anchor>
        <Anchor component={Link} variant="text" to="/prompts">
          Prompts
        </Anchor>
        <Anchor component={Link} variant="text" to="/iamnew">
          I am new
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
                  backgroundColor: "gray",
                  textAlign: "center",
                  marginRight: "9px",
                }}
              >
                U
              </div>
              <Text component={Link} to="/profile">
                UserTest1{" "}
              </Text>
              <Text> | </Text>
              <Text
                component={Link}
                to="/"
                onClick={() => {
                  props.setLoggedIn(false);
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
