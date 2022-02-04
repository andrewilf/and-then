import { Text, useMantineTheme, Group, Anchor, Container, Input } from "@mantine/core";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useMantineTheme();
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
          <Text>
            Email:{" "}
            <Anchor href="https://mantine.dev/" target="_blank">
              Mantine docs
            </Anchor>
          </Text>
          <Text>
            GitHub:{" "}
            <Anchor href="https://mantine.dev/" target="_blank">
              Mantine docs
            </Anchor>
          </Text>
          <Text>
            LinkedIn:{" "}
            <Anchor href="https://mantine.dev/" target="_blank">
              Mantine docs
            </Anchor>
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <Text weight={700}>MENU</Text>
          <Anchor component={Link} to="/">
            Home
          </Anchor>
          <Anchor component={Link} to="/prompts">
            Random Prompt
          </Anchor>
          <Anchor component={Link} to="/prompts">
            Prompts
          </Anchor>
          <Anchor component={Link} to="/iamnew">
            I am new
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
          <Anchor component={Link} variant="text" to="/prompts">
            Hunt for the MacGuffin MacMuffin
          </Anchor>
          <Anchor component={Link} variant="text" to="/prompts">
            Letter Runner
          </Anchor>
          <Anchor component={Link} variant="text" to="/prompts">
            Hackerman
          </Anchor>
          <Anchor component={Link} variant="text" to="/prompts">
            Suprise! Pirates
          </Anchor>
        </div>
        <div style={{ alignSelf: "flex-start" }}>
          <Text weight={700}>NEWSLETTER</Text>
          <Text>Email</Text>
          {/* <Input icon={<MailIcon />} placeholder="Your email" /> */}
        </div>
      </Group>
    </div>
  );
};

export default Footer;
