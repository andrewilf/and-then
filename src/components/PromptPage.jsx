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
import { useState, useEffect, useContext } from "react";
import StoryNode from "./StoryNode";
import { Carousel } from "react-responsive-carousel";
import { useWindowScroll } from "@mantine/hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Pencil1Icon } from "@modulz/radix-icons";
import { LoginContext, adminContext, userContext } from "../global/context";
import variousVariables from "./variousVariables";

const PromptPage = () => {
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
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [scroll, setScroll] = useWindowScroll();
  const { promptID } = useParams();
  const [collapsePrompt, setcollapsePrompt] = useState(false);
  const [follow, setFollow] = useState(false);
  const [collapseInfo, setCollapseInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storyNodes, setStoryNodes] = useState([]);
  const [proposedNodes, setProposedNodes] = useState([]);
  //const [updateToggle, setupdateToggle] = useState(false);
  const storyNodesMapped = storyNodes.map((element) => (
    <StoryNode
      key={element._id + "-sn"}
      text={element.text}
      author={element.author}
      updatedAt={element.updatedAt}
    />
  ));
  const proposedNodesMapped = proposedNodes.map((element) => (
    <div key={Math.random()} style={{ margin: "8px" }}>
      <StoryNode
        key={element._id + "proposed"}
        canApprove={user._id === payload.owner ? true : false}
        canEdit={element.authorID === user._id ? true : false}
        _id={element._id}
        text={element.text}
        author={element.author}
        updatedAt={element.updatedAt}
        promptAPI={async () => {
          //await followAPICall(promptID);
          await promptAPICall(promptID);
        }}
        // updateToggle={updateToggle}
        //setupdateToggle={setupdateToggle}
        storyline={payload.storyline[0]._id}
        promptID={promptID}
      />
    </div>
  ));

  const promptAPICall = async () => {
    setLoading(true);
    const baseURL = `https://and-then-backend.herokuapp.com/prompt/${promptID}/`;
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      //data.owner = data.username;
      setPayload(data);
      console.log(
        data.followers.find((element) => element == user._id) === user._id,
        user
      );
      setFollow(
        data.followers.find((element) => element == user._id) === user._id
          ? true
          : false
      );

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
          return false;
        }
      } else {
        console.log("no story nodes found");
        setStoryNodes([]);
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
          return false;
        }
      } else {
        console.log("no proposed nodes found");
        setProposedNodes([]);
      }
      setLoading(false);
      return true;
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
      return false;
    }
  };

  const followAPICall = async (value) => {
    const baseURL = `https://and-then-backend.herokuapp.com/prompt/follow/${promptID}/`;
    try {
      const response = await fetch(baseURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ userID: user._id, followStatus: value }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    promptAPICall();
    //setScroll({ y: 0 });
  }, [user, promptID]);

  return (
    <div
      style={{
        padding: "2% 5% 5% 5%",
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
              height={400}
              withPlaceholder
              alt="banner image"
            />
            <Space h="20px" />
            <Group position="apart">
              <Group>
                <Badge
                  color={variousVariables.ratingColor[payload.rating]}
                  variant="light"
                  radius="xl"
                  size="lg"
                >
                  {payload.rating}
                </Badge>
                <Badge
                  color={variousVariables.genreColor(payload.genre)}
                  variant="outline"
                  radius="xl"
                  size="lg"
                >
                  {payload.genre}
                </Badge>
                <Badge
                  color={variousVariables.statusColor[payload.status]}
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
              {loggedIn ? (
                <Switch
                  size="md"
                  label="Follow"
                  color="green"
                  checked={follow}
                  onChange={(event) => {
                    setFollow(event.currentTarget.checked);
                    console.log("follow state", event.currentTarget.checked);
                    followAPICall(event.currentTarget.checked);
                  }}
                  styles={{
                    input: { backgroundColor: "gray" },
                  }}
                />
              ) : (
                ""
              )}

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
              {payload.owner === user._id ? (
                <Button
                  radius="md"
                  color="dark"
                  leftIcon={<Pencil1Icon />}
                  component={Link}
                  to={`/editprompt/${promptID}`}
                >
                  Edit
                </Button>
              ) : (
                ""
              )}
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
                {payload.additionalInfo || "No additional info"}
              </Text>
            </Collapse>
            <Space h="20px" />
            <Divider />
            {storyNodesMapped}
            {payload.status === "Ongoing" ? (
              <div>
                <Divider />
                <Space h="20px" />
                <Title order={2}>and then...</Title>
                <Carousel
                  showThumbs={false}
                  centerMode={true}
                  centerSlidePercentage={101 - proposedNodesMapped.length}
                  style={{ color: "red" }}
                  showArrows={true}
                  showStatus={false}
                  infiniteLoop={true}
                  useKeyboardArrows={true}
                  key="carousel"
                >
                  {proposedNodesMapped}
                </Carousel>
                {proposedNodesMapped.length === 0 ? (
                  <div
                    style={{
                      width: 340,
                      margin: "auto",
                      paddingBottom: "1.5%",
                    }}
                  >
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="lg"
                      withBorder={true}
                    >
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
                <Group position="center" direction="column">
                  <Button
                    component={Link}
                    to={`/createnode/${promptID}/${payload.storyline[0]._id}`}
                    radius="md"
                    size="xl"
                    color="dark"
                  >
                    Suggest node
                  </Button>
                  {payload.owner === user._id ? (
                    <div>
                      <Button
                        // component={Link}
                        // to={`/createnode/${promptID}/${payload.storyline[0]._id}`}
                        onClick={() => {
                          console.log("the end");
                          promptAPICall(promptID);
                        }}
                        radius="md"
                        size="xl"
                        color="green"
                      >
                        The End.
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Group>
              </div>
            ) : (
              <div></div>
            )}
          </div>
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
