import React, { useState, useEffect, useContext } from "react";
import parse from "html-react-parser";
import { RichTextEditor } from "@mantine/rte";
import { Title, Space, Group, Button, Loader, Text } from "@mantine/core";
import "../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@modulz/radix-icons";
import { LoginContext, adminContext, userContext } from "../global/context";
import { useNotifications } from "@mantine/notifications";
import { useModals } from "@mantine/modals";

const CreateNodePage = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const notifications = useNotifications();
  const modals = useModals();
  const { user, setUser } = useContext(userContext);
  const { promptID, storylineID } = useParams();
  // const initialValue =
  //   "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
  const [value, onChange] = useState("");
  //  const [display, setDisplay] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [promptDetails, setPromptDetails] = useState({
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
  const openConfirmModal = (value) =>
    modals.openConfirmModal({
      closeOnConfirm: false,
      title: "Submission confirmation",
      children: (
        <div>
          <Text>
            Do note the node can be edited while it is a suggested node.
          </Text>
          <Space h="15px"/>
          <Text color="red">
            It cannot be edited once it has been added to a storyline. Are you
            sure you want to submit?
          </Text>
        </div>
      ),
      labels: { confirm: "Yes", cancel: "No" },
      onCancel: () => {
        console.log("canceled modal");
        setSubmitting(false);
      },
      onConfirm: () => {
        console.log("Confirmed");
        modals.closeModal();
        submitNode({
          author: user._id,
          text: value,
          prompt: promptID,
          storyline: storylineID,
        });
      },
    });
  const promptAPICall = async () => {
    setLoading(true);
    const baseURL = `https://and-then-backend.herokuapp.com/prompt/${promptID}/`;
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      setPromptDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
    }
  };

  const submitNode = async (payload) => {
    const baseURL = `https://and-then-backend.herokuapp.com/node/addtostoryline`;
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      setSubmitting(false);
      notifications.showNotification({
        title: "Node suggested",
        message: "Hey there, your suggested node is now public!",
        color: "green",
        //  style: { backgroundColor: "red" },
      });
      navigate(`/prompt/${promptID}`);
    } catch (error) {
      console.log("error>>>", error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    promptAPICall();
  }, []);

  return (
    <div style={{ padding: "5% 5% 5% 5%" }}>
      {!loading ? (
        <div>
          <Title order={1} align="center">
            Creating node for: {promptDetails.title}
          </Title>
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
          <Space h="20px" />
          <RichTextEditor
            value={value}
            onChange={onChange}
            controls={[
              ["bold", "italic", "underline", "clean"],
              ["unorderedList", "orderedList", "blockquote"],
              ["h1", "h2", "h3"],
              ["sup", "sub"],
              ["alignLeft", "alignCenter", "alignRight"],
            ]}
          />
          <Space h="20px" />
          <Group position="center">
            <Button
              color="dark"
              radius="md"
              size="xl"
              disabled={submitting}
              onClick={() => {
                setSubmitting(true);
                console.log(value);
                //const change = value.replace(" class=", " className=")
                //console.log(change)
                // setDisplay(value);
                openConfirmModal(value);
              }}
            >
              Submit Node
            </Button>
          </Group>

          {/* <div>{parse(display)}</div> */}
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

export default CreateNodePage;
