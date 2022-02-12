import React, { useEffect, useState } from "react";
import {
  Title,
  Space,
  Group,
  Button,
  InputWrapper,
  Input,
  Textarea,
  Text,
  Select,
  Image,
} from "@mantine/core";
import SelectTags from "./SelectTags";
import { useWindowScroll } from "@mantine/hooks";
import {
  Cross1Icon,
  CheckIcon,
  CrumpledPaperIcon,
  ArrowLeftIcon,
} from "@modulz/radix-icons";
import { Link } from "react-router-dom";

const EditPromptSection = () => {
  const genreTags = process.env.REACT_APP_GENRE_TAGS.split(",");
  const [imageURL, setimageURL] = useState(
    "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
  );
  const [scroll, setScroll] = useWindowScroll();

  useEffect(() => {
  //  setScroll({ y: 0 });
  }, []);
  return (
    <div style={{ padding: "5% 5% 5% 5%", width: "70%", margin: "auto" }}>
      <Title order={1} align="center">
        Edit Prompt: Letter Runner
      </Title>
      <Button
        color="dark"
        leftIcon={<ArrowLeftIcon />}
        component={Link}
        to="/prompt"
      >
        Back
      </Button>
      <Space h="20px" />
      <Group direction="column" grow>
        <InputWrapper
          id="input-title"
          required
          label="Title"
          description="Please enter your prompt title."
          error="title error"
        >
          <Input id="input-title" value={"Letter Runner"} />
        </InputWrapper>
        <InputWrapper
          id="input-prompt"
          required
          label="Prompt"
          description="Please enter your prompt."
          error="prompt error"
        >
          <Textarea id="input-prompt" autosize minRows={4} />
        </InputWrapper>
        <InputWrapper
          id="input-addinfo"
          label="Additional Information"
          description="Please enter any additional information."
          error="addinfo error"
        >
          <Textarea id="input-addinfo" autosize minRows={4} />
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
          <SelectTags tags={genreTags} multiple={false} />
        </div>
        <Text>Rating</Text>

        <SelectTags tags={["Everyone", "Teen", "Mature"]} />
        <Space h="25px" />
        <Group position="apart" grow align>
          <InputWrapper
            id="input-image"
            label="Banner Image"
            description="Please enter select a banner image."
            error="image error"
          >
            {/* <Textarea id="input-image" autosize minRows={4} /> */}
            <Select
              onChange={(value) => {
                setimageURL(value);
              }}
              id="input-image"
              placeholder="Pick one"
              data={[
                {
                  value:
                    "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
                  label: "Norway",
                },
                {
                  value:
                    "https://imageio.forbes.com/specials-images/imageserve/1026205392/Beautiful-luxury-home-exterior-at-twilight/960x0.jpg?fit=bounds&format=jpg&width=960",
                  label: "House",
                },
              ]}
            />
          </InputWrapper>
          <Image src={imageURL} height={160} alt="Norway" radius={"md"} />
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
          component={Link}
          to="/prompt"
        >
          Delete prompt
        </Button>
        <Button
          radius="xl"
          color="dark"
          size="xl"
          leftIcon={<CheckIcon />}
          component={Link}
          to="/prompt"
        >
          Edit prompt
        </Button>
      </Group>
      <Space h="40px" />
    </div>
  );
};

export default EditPromptSection;
