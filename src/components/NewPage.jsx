import { Title, Space, Group, Text, Blockquote, Image } from "@mantine/core";
import React, { useState, useEffect, useContext } from "react";
import { useWindowScroll } from "@mantine/hooks";
const NewPage = (props) => {
  const [scroll, setScroll] = useWindowScroll();
  useEffect(() => {
    document.title = `Then - I am New`;
    setScroll({ y: 0 });
  }, []);
  return (
    <div style={{ padding: "2% 5% 5% 5%" }}>
      <Title order={1}>Welcome to And Then</Title>
      <Text> a collaborative writing platform for adventurous authors!</Text>
      {/* <Title order={2}>Prompt</Title>
      <Text>submit a prompt</Text>
      <Title order={2}>Participate</Title>
      <Text>Participate with the Community</Text>
      <Title order={2}>Publish</Title>
      <Text>Publish your story</Text> */}
      <Space h="30px" />
      <Title order={2}>Grow a Story Together</Title>
      <Text>
        And Then is a collaborative platform that brings together adventurous
        authors who want to spark and bounce plot points and ideas for stories
        with each other to create a story they could not have thought of alone.
      </Text>
      <Space h="10px" />
      <Text>
        It's a platform for people who might have felt too daunted to write a
        story alone, or writers who have hit a road block or just dreamers who
        want to jam and see where their collective creativity takes them. Every
        journey begins with a prompt, which you can create for yourself or build
        on an existing prompt, and what the ending is depends on you and your
        community.
      </Text>
      <Space h="10px" />
      <Group position="center">
        <Blockquote cite={"Robin Williams"}>
          {
            "Being in the same room with people and creating something together is a good thing."
          }
        </Blockquote>
      </Group>
      <Title order={2}>How Does It Work?</Title>
      <Text>
        Whether you take on the role of an editor or just want to participate,
        you can join the community and create something unique together.
      </Text>
      <Space h="30px" />
      <Group grow position="center">
        <div
          style={{
            //  backgroundColor: theme.colors.dark[7],
            width: "30%",
            border: "1px solid gray",
            borderRadius: "15px",
            padding: "1%",
            margin: "auto",
            // display: "flex",
            // justifyContent: "center",
            // flexDirection: "column"
          }}
        >
          <Group position="center" direction="column">
            <Title order={3}>Prompt</Title>
            <Text align="center">
              Take on an editor role and start a story with a prompt - anything
              you like - and the community will join in and together, you will
              unravel the story. Once it starts, you will never know where it
              will end
            </Text>

            <Image
              src="https://cdn-icons-png.flaticon.com/512/3627/3627782.png"
              height={"90px"}
              fit="contain"
              alt="prompt icon"
              radius={"md"}
            />
          </Group>
        </div>
        <div
          style={{
            //  backgroundColor: theme.colors.dark[7],
            width: "30%",
            border: "1px solid gray",
            borderRadius: "15px",
            padding: "1%",
            margin: "auto",
          }}
        >
          <Group position="center" direction="column">
            <Title order={3}>Participate</Title>
            <Text>
              Join the community and help bring any story to life by adding your
              own unique take to the plot. Bounce ideas off others - you will be
              suprised how your contribution can shape a story
            </Text>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2646/2646008.png"
              height={"90px"}
              fit="contain"
              alt="prompt icon"
              radius={"md"}
            />
          </Group>
        </div>
        <div
          style={{
            //  backgroundColor: theme.colors.dark[7],
            width: "30%",
            border: "1px solid gray",
            borderRadius: "15px",
            padding: "1%",
            margin: "auto",
          }}
        >
          <Group position="center" direction="column">
            <Title order={3}>Publish</Title>
            <Text>
              The platform allows editors to close and publish the completed
              stories, with every contributors name, so that you are always
              going to be a part of that great adventure
            </Text>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/6946/6946231.png"
              height={"90px"}
              fit="contain"
              alt="prompt icon"
              radius={"md"}
            />
          </Group>
        </div>
      </Group>
    </div>
  );
};

export default NewPage;
