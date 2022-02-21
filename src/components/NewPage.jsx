import { Title, Space, Group, Text, Blockquote, Skeleton } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
const NewPage = (props) => {
  useEffect(() => {
    document.title = `Then - I am New`;
  }, []);
  return (
    <div style={{ padding: "5% 5% 5% 5%" }}>
      <Group position="center">
        <Blockquote cite={"Robin Williams"}>
          {
            "Being in the same room with people and creating something together is a good thing."
          }
        </Blockquote>
      </Group>

      <Title order={1}>Welcome to And Then</Title>
      <Text> a collaborative writing platform where everyone can write!</Text>
      <Title order={2}>Prompt</Title>
      <Text>submit a prompt</Text>
      <Title order={2}>Participate</Title>
      <Text>Participate with the Community</Text>
      <Title order={2}>Publish</Title>
      <Text>Publish your story</Text>
    </div>
  );
};

export default NewPage;
