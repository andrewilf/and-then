import {
  Title,
  Image,
  Space,
  Group,
  Text,
  Switch,
  Button,
  Divider,
  Collapse,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import StoryNode from "./StoryNode";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Pencil1Icon } from "@modulz/radix-icons";

const PromptPage = () => {
  const [collapsePrompt, setcollapsePrompt] = useState(false);
  const [collapseInfo, setCollapseInfo] = useState(false);
  const prompt =
    "One day a boys destiny changed forever after a letter from his estranged uncle arrived. \nIt contained a check for one million dollars with a bloody note saying: “spend it well and hide”";
  const additionalInfo =
    " Serious nodes only, 1st Person view only. \nAdding Weekly, Fridays 9pm SGT Planning to maybe end in 50 nodes. \nNothing too graphic, 12 - 17 year old target audience \nDiscord channel for Discussions: https://www.invitelegit.com";
  
    return (
    <div
      style={{
        padding: "2% 5% 5% 5%",
      }}
    >
      <Title order={1} align="center">
        Letter Runner
      </Title>
      <Space h="20px" />
      <div style={{ width: "70%", margin: "auto" }}>
        <Image
          style={{ width: "100%", margin: "auto" }}
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          radius="lg"
          height={400}
          alt="Norway"
        />
        <Space h="20px" />
        <Group position="apart">
          <Group>
            <Text>Rating: Teen</Text>
            <Text>Genre: Thriller</Text>
          </Group>

          <Text>Prompt Owner: UserTest1</Text>
        </Group>
        <Group position="apart">
          <Group>
            <Text>Followers: 100</Text>
            <Text>Nodes: 3</Text>
          </Group>

          <Text>Created: 10 Jan 2021</Text>
        </Group>
        <Group position="apart">
          <Switch
            size="md"
            label="Follow"
            color="green"
            styles={{
              input: { backgroundColor: "gray" },
            }}
          />
          <Text>Last updated: 19 Jan 2021</Text>
        </Group>
        <Space h="20px" />
        <Group position="apart">
          <Button
            radius="md"
            color="dark"
            onClick={() => setcollapsePrompt((o) => !o)}
          >
            Toggle Prompt
          </Button>
          <Button
            radius="md"
            color="dark"
            leftIcon={<Pencil1Icon />}
            component={Link}
            to="/editprompt"
          >
            Edit
          </Button>
        </Group>
        <Collapse in={collapsePrompt}>
          <Space h="20px" />
          <Text style={{ whiteSpace: "pre-line" }}>{prompt}</Text>
        </Collapse>
        <Space h="20px" />
        <Button
          radius="md"
          color="dark"
          onClick={() => setCollapseInfo((o) => !o)}
        >
          Toggle additional info
        </Button>
        <Collapse in={collapseInfo}>
          <Space h="20px" />
          <Text style={{ whiteSpace: "pre-line" }}>{additionalInfo}</Text>
        </Collapse>
        <Space h="20px" />
        <Divider />
        <StoryNode />
        <StoryNode />
        <StoryNode />
        <StoryNode />
        <Divider />
        <Space h="20px" />
        <Title order={2}>And Then...</Title>
        <Carousel
        showThumbs={false}
          centerMode={true}
          centerSlidePercentage={97}
          style={{ color: "red" }}
          showArrows={true}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
        >
          <div style={{ margin: "8px" }}>
            <StoryNode canApprove={true} canEdit={true} />
          </div>
          <div style={{ margin: "8px" }}>
            <StoryNode canApprove={true} canEdit={true} />
          </div>
          <div style={{ margin: "8px" }}>
            <StoryNode canApprove={true} canEdit={true} />
          </div>
          <div style={{ margin: "8px" }}>
            <StoryNode canApprove={true} canEdit={true} />
          </div>
        </Carousel>
      </div>
      <Group position="center">
        <Button
          component={Link}
          to="/createnode"
          radius="md"
          size="xl"
          color="dark"
        >
          Suggest node
        </Button>
      </Group>
    </div>
  );
};

export default PromptPage;
