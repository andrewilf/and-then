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
  Badge,
  Loader,
  Card,
} from "@mantine/core";
import { parseISO } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StoryNode from "./StoryNode";
import { Carousel } from "react-responsive-carousel";
import { useWindowScroll } from "@mantine/hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Pencil1Icon } from "@modulz/radix-icons";

const PromptPage = () => {
  const [scroll, setScroll] = useWindowScroll();
  const { promptID } = useParams();
  const [collapsePrompt, setcollapsePrompt] = useState(false);
  const [collapseInfo, setCollapseInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storyNodes, setStoryNodes] = useState([]);
  const [proposedNodes, setProposedNodes] = useState([]);
  const storyNodesMapped = storyNodes.map((element) => (
    <StoryNode
      key={element._id}
      text={element.text}
      author={element.author}
      updatedAt={element.updatedAt}
    />
  ));
  const proposedNodesMapped = proposedNodes.map((element) => (
    <div style={{ margin: "8px" }}>
      <StoryNode
        canApprove={true}
        canEdit={true}
        _id={element._id}
        key={element._id}
        text={element.text}
        author={element.author}
        updatedAt={element.updatedAt}
      />
    </div>
  ));
  const [payload, setPayload] = useState({
    additionalInfo: "",
    bannerURL: "",
    createdAt: "",
    genre: "",
    owner: "",
    promptText: "",
    rating: "",
    username: "",
    storyline: [{ storyNodes: [], proposedNodes: [] }],
    status: "",
    createdAt: "",
    updatedAt: "",
    followers: [],
  });
  const prompt =
    "One day a boys destiny changed forever after a letter from his estranged uncle arrived. \nIt contained a check for one million dollars with a bloody note saying: “spend it well and hide”";
  const additionalInfo =
    " Serious nodes only, 1st Person view only. \nAdding Weekly, Fridays 9pm SGT Planning to maybe end in 50 nodes. \nNothing too graphic, 12 - 17 year old target audience \nDiscord channel for Discussions: https://www.invitelegit.com";

  const ratingColor = {
    Mature: "violet",
    Teen: "orange",
    Everyone: "blue",
  };
  const statusColor = {
    Completed: "green",
    Ongoing: "yellow",
  };
  const genreColor = (genre) => {
    switch (genre) {
      case "Fantasy":
        return "green";
      case "Thriller":
        return "grape";
      case "Adventure":
        return "indigo";
      case "Historical":
        return "orange";
      case "SciFi":
        return "yellow";
      case "Horror":
        return "teal";
      case "Romance":
        return "red";
      case "FanFiction":
        return "lime";
      case "Others":
        return "gray";
      default:
        return "gray";
    }
  };

  const promptAPICall = async () => {
    setLoading(true);
    const baseURL = `https://and-then-backend.herokuapp.com/prompt/${promptID}/`;
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      //data.owner = data.username;
      setPayload(data);

      if (data.storyline[0].storyNodes.length !== 0) {
        console.log("story nodes found");
        const nodeIDs = data.storyline[0].storyNodes;
        const nodeURL = `https://and-then-backend.herokuapp.com/node/multi/${nodeIDs}`;
        try {
          const responseNode = await fetch(nodeURL);
          const dataNode = await responseNode.json();
          console.log(dataNode);
          setStoryNodes(dataNode);
          //setLoading(false);
        } catch (error) {
          console.log("error>>>", error);
          setLoading(false);
        }
      }
      if (data.storyline[0].proposedNodes.length !== 0) {
        console.log("proposed nodes found");
        const nodeIDs = data.storyline[0].proposedNodes;
        const nodeURL = `https://and-then-backend.herokuapp.com/node/multi/${nodeIDs}`;
        try {
          const responseNode = await fetch(nodeURL);
          const dataNode = await responseNode.json();
          console.log(dataNode);
          setProposedNodes(dataNode);
          // setLoading(false);
        } catch (error) {
          console.log("error>>>", error);
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    promptAPICall();
    //setScroll({ y: 0 });
  }, []);

  return (
    <div
      style={{
        padding: "5% 5% 5% 5%",
      }}
    >
      {!loading ? (
        <div>
          <Title order={1} align="center">
            {payload.title}
          </Title>
          <Space h="20px" />
          <div style={{ width: "70%", margin: "auto" }}>
            <Image
              style={{ width: "100%", margin: "auto" }}
              src={payload.bannerURL}
              radius="lg"
              height={450}
              withPlaceholder
              alt="banner image"
            />
            <Space h="20px" />
            <Group position="apart">
              <Group>
                <Badge
                  color={ratingColor[payload.rating]}
                  variant="light"
                  radius="xl"
                  size="lg"
                >
                  {payload.rating}
                </Badge>
                <Badge
                  color={genreColor(payload.genre)}
                  variant="outline"
                  radius="xl"
                  size="lg"
                >
                  {payload.genre}
                </Badge>
                <Badge
                  color={statusColor[payload.status]}
                  variant="dot"
                  radius="xl"
                  size="lg"
                >
                  {payload.status}
                </Badge>
              </Group>

              <Text>Prompt Owner: {payload.username}</Text>
            </Group>
            <Space h="10px" />
            <Group position="apart">
              <Group>
                <Text>Followers: {payload.followers.length}</Text>
                <Text>Nodes: {payload.storyline[0].storyNodes.length}</Text>
              </Group>

              <Text>
                Created:{" "}
                {parseISO(payload.createdAt).toLocaleDateString("en-SG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
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
              <Text>
                Last updated:{" "}
                {parseISO(payload.createdAt).toLocaleDateString("en-SG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
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
              <Text style={{ whiteSpace: "pre-line" }}>
                {payload.promptText}
              </Text>
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
              <Text style={{ whiteSpace: "pre-line" }}>
                {payload.additionalInfo}
              </Text>
            </Collapse>
            <Space h="20px" />
            <Divider />
            {/* <StoryNode />
            <StoryNode />
            <StoryNode />
            <StoryNode /> */}
            {storyNodesMapped}
            <Divider />
            <Space h="20px" />
            <Title order={2}>Possible suggestions</Title>
            <Carousel
              showThumbs={false}
              centerMode={true}
              centerSlidePercentage={100 - proposedNodesMapped.length}
              style={{ color: "red" }}
              showArrows={true}
              showStatus={false}
              infiniteLoop={true}
              useKeyboardArrows={true}
            >
              {proposedNodesMapped}
            </Carousel>
            {proposedNodesMapped.length == 0 ? (
              <div
                style={{ width: 340, margin: "auto", paddingBottom: "1.5%" }}
              >
                <Card shadow="sm" padding="lg" radius="lg" withBorder={true}>
                  <Card.Section>
                    <Image
                      src={payload.bannerURL}
                      height={160}
                      alt="banner image"
                      withPlaceholder
                    />
                  </Card.Section>
                  <Group
                    position="apart"
                    style={{ marginBottom: 5, marginTop: 2 }}
                  >
                    <Title order={2} weight={700}>
                      No other suggestions
                    </Title>
                  </Group>
                  <Space h="10px" />
                  Contribute and play a part in the story's creation.
                </Card>
              </div>
            ) : (
              ""
            )}
          </div>
          <Group position="center">
            <Button
              component={Link}
              to={`/createnode/${promptID}/${payload.storyline[0]._id}`}
              radius="md"
              size="xl"
              color="dark"
            >
              Suggest node
            </Button>
          </Group>
        </div>
      ) : (
        <div style={{ height: "200px" }}>
          <Group position="center" direction="column">
            <Loader color="gray" size="xl" variant="dots" />
          </Group>
        </div>
      )}
    </div>
  );
};

export default PromptPage;
