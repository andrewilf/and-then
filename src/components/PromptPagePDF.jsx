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
  Anchor,
  Card,
} from "@mantine/core";
import { parseISO } from "date-fns";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import StoryNode from "./StoryNode";
import { Carousel } from "react-responsive-carousel";
import { useWindowScroll } from "@mantine/hooks";
import Pdf from "react-to-pdf";
import parse from "html-react-parser";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Pencil1Icon } from "@modulz/radix-icons";
import { LoginContext, adminContext, userContext } from "../global/context";
import variousVariables from "./variousVariables";
import { useModals } from "@mantine/modals";

const PromptPagePDF = () => {
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
  const ref = React.createRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [20, 30],
  };

  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [scroll, setScroll] = useWindowScroll();
  const { promptID } = useParams();
  const [collapsePrompt, setcollapsePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storyNodes, setStoryNodes] = useState([]);
  const [by, setBy] = useState("");
  //const [updateToggle, setupdateToggle] = useState(false);
  const storyNodesMapped = storyNodes.map((element) => (
    <StoryNode
      key={element._id + "-sn"}
      text={element.text}
      author={element.author}
      updatedAt={element.updatedAt}
    />
  ));
  const storyNodesMappedPDF = storyNodes.map(
    (element) =>
      // <StoryNode
      //   key={element._id + "-sn"}
      //   text={element.text}
      //   author={element.author}
      //   updatedAt={element.updatedAt}
      // />
      element.text
  );

  const promptAPICall = async () => {
    setLoading(true);
    const baseURL = `https://and-then-backend.herokuapp.com/prompt/${promptID}/`;
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      //data.owner = data.username;
      setPayload(data);
      setBy(data.username);
      console.log(
        data.followers.find((element) => element == user._id) === user._id,
        user
      );
      document.title = `Then - ${data.title} PDF`;

      if (data.storyline[0].storyNodes.length !== 0) {
        console.log("story nodes found");
        const nodeIDs = data.storyline[0].storyNodes;
        const nodeURL = `https://and-then-backend.herokuapp.com/node/multi/${nodeIDs}`;
        try {
          const responseNode = await fetch(nodeURL);
          const dataNode = await responseNode.json();
          console.log(dataNode);
          setStoryNodes(dataNode);
          const authors = dataNode.map((element) => ", " + element.author).join('');
          const setAuthors = authors.substring(2)
          //setLoading(false);
          setBy(setAuthors);
        } catch (error) {
          console.log("error>>>", error);
          setLoading(false);
          return false;
        }
      } else {
        console.log("no story nodes found");
        setStoryNodes([]);
      }
      setLoading(false);
      return true;
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
      return false;
    }
  };
  //console.log(storyNodesMappedPDF.join())

  useEffect(() => {
    promptAPICall();

    //setScroll({ y: 0 });
  }, [user, promptID]);

  return (
    <div
      ref={ref}
      style={{
        padding: "2% 5% 5% 5%",
        color: "black",
        backgroundColor: "white",
      }}
    >
      {!loading ? (
        <div>
          <Title order={1} align="center" style={{ color: "black" }}>
            {payload.title}
          </Title>

          {/* <div ref={ref}>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
          </div> */}
          <Space h="20px" />
          <div style={{ width: "70%", margin: "auto" }}>
            {/* <Image
              style={{ width: "100%", margin: "auto" }}
              src={payload.bannerURL}
              radius="lg"
              height={400}
              withPlaceholder
              alt="banner image"
            /> */}
            <Space h="20px" />
            <Group position="center">
              <Group></Group>

              {/* <Text>Prompt Owner: {payload.username}</Text> */}
              <Text>By: {by}</Text>
            </Group>
            <Space h="10px" />
            <Group position="apart"></Group>
            <Group position="apart"></Group>
            <Space h="20px" />
            <Group position="apart">
              <Pdf
                targetRef={ref}
                options={options}
                filename={`${payload.title}.pdf`}
              >
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
              </Pdf>
            </Group>

            <Text style={{ whiteSpace: "pre-line" }}>{payload.promptText}</Text>

            <Space h="20px" />

            <Space h="20px" />
            <Divider />
            {parse(storyNodesMappedPDF.join(""))}
            {payload.status === "Ongoing" ? (
              <div>
                {" "}
                <Text>{`and then...`}</Text>
                <Text>Continue the story at: </Text>
                <Anchor
                  size="xl"
                  component={Link}
                  to={`/prompt/${promptID}`}
                  color="dark"
                >
                  {`https://and-then-front-end.herokuapp.com/prompt/${promptID}`}
                </Anchor>
              </div>
            ) : (
              <Text size="xl" align="center">
                The end.
              </Text>
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

export default PromptPagePDF;
