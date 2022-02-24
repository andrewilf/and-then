import React, { useEffect, useState } from "react";
import {
  Title,
  Space,
  Group,
  Button,
  InputWrapper,
  TextInput,
  Textarea,
  Text,
  Select,
  Loader,
  Image,
} from "@mantine/core";
import SelectTags from "./SelectTags";
import { useWindowScroll } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import { useForm } from "@mantine/hooks";
import variousVariables from "./variousVariables";
import {
  Cross1Icon,
  CheckIcon,
  CrumpledPaperIcon,
  ArrowLeftIcon,
} from "@modulz/radix-icons";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditPromptSection = () => {
  //console.log(variousVariables.genreColor("Fantasy"));
  const genreTags = process.env.REACT_APP_GENRE_TAGS.split(",");
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { promptID } = useParams();
  const [scroll, setScroll] = useWindowScroll();
  const [loading, setLoading] = useState(false);
  const [genreSelect, setGenreSelect] = useState("");
  const [ratingSelect, setRatingSelect] = useState("");
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
  const form = useForm({
    initialValues: {
      title: "",
      promptText: "",
      additionalInfo: "",
      rating: "",
      genre: "",
      bannerURL:
        "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    validationRules: {
      title: (value) => value.trim().length >= 3,
      promptText: (value) => value.trim().length >= 3,
    },
    errorMessages: {
      title: "Title must be at least 3 characters long",
      promptText: "Prompt must be at least 3 letters long",
    },
  });
  const modals = useModals();
  const openConfirmModal = () =>
    modals.openConfirmModal({
      closeOnConfirm: false,
      title: "Confirm delete prompt",
      children: (
        <Text color="red">
          Are you sure you want to delete this prompt? It cannot be recovered
          once deleted.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {
        console.log("Cancel");
      },
      onConfirm: () => {
        console.log("Confirmed");
        //command to close modal
        deletePromptAPI(payload);
        modals.closeModal();
      },
    });

  const promptAPICall = async () => {
    setLoading(true);
    const baseURL = `https://and-then-backend.herokuapp.com/prompt/${promptID}/`;
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      setPayload(data);
      setGenreSelect(data.genre);
      setRatingSelect(data.rating);
      form.setValues({
        title: data.title,
        promptText: data.promptText,
        additionalInfo: data.additionalInfo,
        rating: data.rating,
        genre: data.genre,
        bannerURL: data.bannerURL,
      });
      setLoading(false);
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
    }
  };

  const editPromptAPI = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://and-then-backend.herokuapp.com/prompt/${promptID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
      notifications.showNotification({
        title: "Prompt edited",
        message: "Hey there, your prompt has been edited!",
        color: "blue",
        //  style: { backgroundColor: "red" },
      });
      setLoading(false);
      navigate(`/prompt/${promptID}`);
    } catch (error) {
      setLoading(false);
      console.log("prompt edit failed");
    }
  };

  const deletePromptAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://and-then-backend.herokuapp.com/prompt/withstoryline`,
        {
           method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
           body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
      notifications.showNotification({
        title: "Prompt deleted",
        message: "Hey there, your prompt has been deleted, reduced to atoms...",
        color: "red",
        //  style: { backgroundColor: "red" },
      });
      setLoading(false);
      navigate(`/prompts/`);
    } catch (error) {
      setLoading(false);
      console.log("prompt delete failed");
    }
  };

  useEffect(() => {

    promptAPICall();
  }, []);
  return (
    <div style={{ padding: "5% 5% 5% 5%", width: "70%", margin: "auto" }}>
      {!loading ? (
        <div>
          <Title order={1} align="center">
            Edit Prompt: {payload.title}
          </Title>
          <Button
            color="dark"
            leftIcon={<ArrowLeftIcon />}
            component={Link}
            to={`/prompt/${promptID}`}
          >
            Back
          </Button>
          <Space h="20px" />
          <form
            onSubmit={form.onSubmit((values) => {
              values.genre = genreSelect;
              values.rating = ratingSelect;
              // values.owner = user._id;
              // form.validate();
              console.log(values);
              editPromptAPI(values);
            })}
          >
            <Group direction="column" grow>
              <InputWrapper
                id="input-title"
                required
                label="Title"
                description="Please enter your prompt title."
                // error="title error"
              >
                <TextInput id="input-title" {...form.getInputProps("title")} />
              </InputWrapper>
              <InputWrapper
                id="input-prompt"
                required
                label="Prompt"
                description="Please enter your prompt."
              >
                <Textarea
                  id="input-prompt"
                  autosize
                  minRows={4}
                  {...form.getInputProps("promptText")}
                />
              </InputWrapper>
              <InputWrapper
                id="input-addinfo"
                label="Additional Information"
                description="Please enter any additional information."
              >
                <Textarea
                  id="input-addinfo"
                  autosize
                  minRows={4}
                  {...form.getInputProps("additionalInfo")}
                />
              </InputWrapper>
              <Text>Genre</Text>
              <div
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingTop: "1%",
                }}
              >
                <SelectTags
                  tags={genreTags}
                  multiple={false}
                  value={genreSelect}
                  setValue={setGenreSelect}
                />
              </div>
              <Text>Rating</Text>

              <SelectTags
                tags={["Everyone", "Teen", "Mature"]}
                value={ratingSelect}
                setValue={setRatingSelect}
              />
              <Space h="25px" />
              <Group position="apart" grow align>
                <InputWrapper
                  id="input-image"
                  label="Banner Image"
                  description="Please enter select a banner image."
                >
                  {/* <Textarea id="input-image" autosize minRows={4} /> */}
                  <Select
                    // onChange={(value) => {
                    //   setimageURL(value);
                    // }}
                    id="input-image"
                    placeholder="Pick one"
                    {...form.getInputProps("bannerURL")}
                    data={variousVariables.bannerObj}
                  />
                </InputWrapper>
                <Image
                  src={form.values.bannerURL}
                  height={290}
                  alt="banner image"
                  radius={"md"}
                />
              </Group>
            </Group>
            <Space h="45px" />
            <Group position="apart">
              {/* <Button
          radius="xl"
          color="dark"
          size="xl"
          leftIcon={<Cross1Icon />}
          component={Link}
          to="/prompt"
        >
          Cancel changes
        </Button> */}
              <Button
                radius="md"
                color="red"
                size="md"
                leftIcon={<CrumpledPaperIcon />}
                // component={Link}
                // to="/prompts"
                onClick={() => {
                  openConfirmModal();
                }}
              >
                Delete prompt
              </Button>
              <Button
                radius="md"
                color="dark"
                size="xl"
                leftIcon={<CheckIcon />}
                // component={Link}
                type="submit"
                onClick={() => {
                  setScroll({ y: 0 });
                }}
                // to={`/prompt/${promptID}`}
              >
                Edit prompt
              </Button>
            </Group>
          </form>
          <Space h="40px" />
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

export default EditPromptSection;
