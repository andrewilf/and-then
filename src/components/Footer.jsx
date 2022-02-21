import {
  Text,
  useMantineTheme,
  Group,
  Anchor,
  Button,
  Input,
  Space,
  Divider,
  Loader,
} from "@mantine/core";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  HomeIcon,
} from "@modulz/radix-icons";
import {
  LoginContext,
  adminContext,
  userContext,
  recentPromptContext,
} from "../global/context";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = (props) => {
  const theme = useMantineTheme();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const { recentPrompts, setRecentPrompts } = useContext(recentPromptContext);
  // const [randomPromptID, setRandomPromptID] = useState("");
  const navigate = useNavigate();

  const allRecentPrompts = recentPrompts.map((element) => (
    <Anchor key={element._id} component={Link} variant="text" to={`/prompt/${element._id}`}>
      {element.title}
    </Anchor>
  ));

  // useEffect(async () => {
  //   setRandomPromptID(await props.getRandomPrompt());
  // }, []);
  return (
    <div
      style={{
        backgroundColor: theme.colors.dark[5],
        height: "200px",
        width: "100%",
        padding: "30px 60px 30px 60px",
      }}
    >
      <Group position="apart" spacing="xs">
        <div style={{ alignSelf: "flex-start" }}>
          <Text weight={700}>CONTACT</Text>
          <Divider />
          <div style={{ alignItems: "center", display: "flex" }}>
            <GitHubLogoIcon />
            <Space w="6px" />
            GitHub:
            <Space w="6px" />
            <Anchor href="https://github.com/andrewilf/" target="_blank">
              andrewilf
            </Anchor>
          </div>
          <div style={{ alignItems: "center", display: "flex" }}>
            <HomeIcon />
            <Space w="6px" />
            LinkedIn:
            <Space w="6px" />
            <Anchor
              href="https://www.linkedin.com/in/andrewianfaulkner/"
              target="_blank"
            >
              andrewianfaulkner
            </Anchor>
          </div>
          <div style={{ alignItems: "center", display: "flex" }}>
            <EnvelopeClosedIcon />
            <Space w="6px" />
            Email:
            <Space w="6px" />
            <Anchor href="https://mail.google.com/mail/" target="_blank">
              andrewfau1kn3r@gmail.com
            </Anchor>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <Text weight={700}>MENU</Text>
          <Divider />
          <Anchor component={Link} to="/">
            Home
          </Anchor>
          <Anchor
            onClick={() => {
              props.getRandomPrompt()
              navigate(`/prompt/${props.randomPromptID}`);
              //window.location.reload(false);
            }}
          >
            Random Prompt
          </Anchor>
          <Anchor component={Link} to="/prompts">
            Prompts
          </Anchor>
          <Anchor component={Link} to="/iamnew">
            I am New
          </Anchor>
          <Anchor component={Link} to="/about">
            About
          </Anchor>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <Text weight={700}>RECENT PROMPTS</Text>
          <Divider />
          {recentPrompts.length !== 0 ? (
            allRecentPrompts
          ) : (
            <div style={{paddingTop: "5px"}}>
              <Loader color="gray" size="md" variant="dots" />
            </div>
          )}
        </div>
        <div style={{ alignSelf: "flex-start", marginRight: "10px" }}>
          <Text weight={700}>NEWSLETTER</Text>
          <Divider />
          <Text size="xs">For project updates</Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              icon={<EnvelopeClosedIcon />}
              size="md"
              variant="default"
              radius="md"
              placeholder="Your email"
            />
            <Space w="5px" />
            <Button size="sm" radius="md" color="dark">
              Submit
            </Button>
          </div>
        </div>
      </Group>
    </div>
  );
};

export default Footer;
