import "../App.css";
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
import { ArrowLeftIcon } from "@modulz/radix-icons";
import { LoginContext, adminContext, userContext } from "../global/context";
import variousVariables from "./variousVariables";
import { useModals } from "@mantine/modals";
import { jsPDF } from "jspdf";

const PromptPagePDF = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
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

  const [height, setheight] = useState(18);
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [windowSize.width / 50, windowSize.height / 50],
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
  const [hideButton, setHideButton] = useState(false);
  const storyNodesMapped = storyNodes.map((element) => (
    <StoryNode
      key={element._id + "-sn"}
      text={element.text}
      author={element.author}
      updatedAt={element.updatedAt}
    />
  ));
  const storyNodesMappedPDF = storyNodes.map((element) => element.text);

  const pdfCreate = () => {
    const doc = new jsPDF("p", "pt", "a4");
    //doc.text(parse(storyNodesMappedPDF.join("")), 10, 10);
    doc.html(document.querySelector("main"), {
      callback: function (pdf) {
        const pageCount = doc.internal.getNumberOfPages();
        pdf.deletePage(pageCount);
        doc.save(`${payload.title}.pdf`);
      },
    });
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
      //setBy(data.username);
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

          const authors = dataNode
            .map((element) => ", " + element.author)
            .join("");
          const setAuthors = authors.substring(2);
          //setLoading(false);
          setBy(setAuthors);
          setStoryNodes(dataNode);
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
  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setheight(document.documentElement.offsetHeight / 100);
    }
    window.addEventListener("resize", handleResize);
    console.log(windowSize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    promptAPICall();
    return () => window.removeEventListener("resize", handleResize);
    //setScroll({ y: 0 });
  }, [user, promptID]);

  return (
    <div
      style={{
        padding: "2% 5% 5% 5%",
        color: "black",
        backgroundColor: "white",
      }}
    >
      {!loading ? (
        <div>
          <Group position="apart">
            <Button
              //          radius="xl"
              color="dark"
              //   size="xl"
              leftIcon={<ArrowLeftIcon />}
              component={Link}
              to={`/prompt/${promptID}`}
            >
              Back
            </Button>
            <Pdf
              targetRef={ref}
              options={options}
              filename={`${payload.title}.pdf`}
              scale={1}
            >
              {({ toPdf }) => (
                <Button
                  hidden={false}
                  onClick={() => {
                    toPdf();
                  }}
                >
                  Generate PDF
                </Button>
              )}
            </Pdf>
          </Group>

          <div style={{ padding: "15px" }} ref={ref}>
            <Title order={1} align="center" style={{ color: "black" }}>
              {payload.title}
            </Title>

            <Space h="20px" />
            {/* <Button onClick={pdfCreate}>click for pdf</Button> */}
            <div key="main" id="main" style={{ padding: "4px" }}>
              <Space h="20px" />
              <Group position="center" direction="column">
                <Text>Prompt by: {payload.username}</Text>
                <Text>Written by: {by}</Text>
              </Group>
              <Space h="10px" />
              <Space h="20px" />
              <Group position="apart"></Group>

              <Text style={{ whiteSpace: "pre-line" }}>
                {payload.promptText}
              </Text>

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
