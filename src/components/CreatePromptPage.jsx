import React, { useState, useEffect, useContext } from "react";
import {
  Title,
  Space,
  Group,
  Button,
  InputWrapper,
  Textarea,
  TextInput,
  Select,
  Image,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import SelectTags from "./SelectTags";
import { ArrowLeftIcon } from "@modulz/radix-icons";
import { useNotifications } from "@mantine/notifications";
import { LoginContext, adminContext, userContext } from "../global/context";
import variousVariables from "./variousVariables";
import { useForm } from "@mantine/hooks";
const CreatePromptPage = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [scroll, setScroll] = useWindowScroll();
  const notifications = useNotifications();
  const navigate = useNavigate();
  const genreTags = process.env.REACT_APP_GENRE_TAGS.split(",");
  const [loading, setLoading] = useState(false);
  // const [bannerImages, setBannerImages] = useState([]);
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

  const [genreSelect, setGenreSelect] = useState("Others");
  const [ratingSelect, setRatingSelect] = useState("Everyone");
  // const [title, setTitle] = useState("");
  // const [promptText, setPromptText] = useState("");
  // const [addInfo, setAddInfo] = useState("");
  // const [imageURL, setimageURL] = useState(
  //   "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
  // );

  const createPrompt = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://and-then-backend.herokuapp.com/prompt/withstoryline",
        {
          method: "POST",
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
        title: "Prompt created",
        message: "Hey there, your prompt is now public!",
        color: "green",
        //  style: { backgroundColor: "red" },
      });
      setLoading(false);
      navigate("/prompts");
    } catch (error) {
      setLoading(false);
      console.log("prompt creation failed");
    }
  };

  useEffect(() => {
    console.log("start load");
    // console.log("login status: ", loggedIn, localStorage.getItem("token"))
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <div style={{ padding: "5% 5% 5% 5%", width: "70%", margin: "auto" }}>
      <Title order={1} align="center">
        Create Prompt
      </Title>
      <Button
        color="dark"
        leftIcon={<ArrowLeftIcon />}
        component={Link}
        to="/prompts"
      >
        Back
      </Button>

      <Space h="20px" />
      <form
        onSubmit={form.onSubmit((values) => {
          values.genre = genreSelect;
          values.rating = ratingSelect;
          values.owner = user._id;
          // form.validate();
          console.log(values);
          createPrompt(values);
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
            <TextInput
              id="input-title"
              onBlur={() => form.validateField("title")}
              {...form.getInputProps("title")}
            />
          </InputWrapper>
          <InputWrapper
            id="input-prompt"
            required
            label="Prompt"
            description="Please enter your prompt."
            // error="prompt error"
          >
            <Textarea
              id="input-prompt"
              autosize
              minRows={2}
              onBlur={() => form.validateField("promptText")}
              {...form.getInputProps("promptText")}
            />
          </InputWrapper>
          <InputWrapper
            id="input-addinfo"
            label="Additional Information"
            description="(Optional) Please enter any additional information."
            // error="addinfo error"
          >
            <Textarea
              id="input-addinfo"
              autosize
              minRows={2}
              {...form.getInputProps("additionalInfo")}
            />
          </InputWrapper>
          <InputWrapper
            id="input-genre"
            label="Genre"
            required
            description="Please choose the genre which best fits the prompt."
            // error="addinfo error"
          >
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
                // {...form.getInputProps('genre')}
                value={genreSelect}
                setValue={setGenreSelect}
              />
            </div>
          </InputWrapper>
          {/* <Text>Genre</Text> */}

          {/* <Text>Rating</Text> */}
          <InputWrapper
            id="input-genre"
            label="Rating"
            description="Please choose the rating which best fits the prompt."
            required
            // error="Select a genre"
          >
            <SelectTags
              tags={["Everyone", "Teen", "Mature"]}
              //  {...form.getInputProps('rating')}
              value={ratingSelect}
              setValue={setRatingSelect}
            />
          </InputWrapper>

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
              withPlaceholder
            />
          </Group>
        </Group>
        <Space h="25px" />
        <Group position="center">
          <Button
            radius="xl"
            color="dark"
            size="xl"
            disabled={loading}
            type="submit"
            onClick={() => {
              if (!form.validate()) {
                setScroll({ y: 0 });
              }
            }}
          >
            Publish prompt
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default CreatePromptPage;
