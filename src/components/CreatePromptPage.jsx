import React, { useState } from "react";
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
const CreatePromptPage = () => {
  const genreTags = process.env.REACT_APP_GENRE_TAGS.split(",");
  console.log(genreTags);
  return (
    <div style={{ padding: "5% 5% 5% 5%", width: "80%", margin: "auto" }}>
      <Title order={1} align="center">
        Create Prompt
      </Title>
      <Space h="20px" />
      <Group direction="column" grow>
        <InputWrapper
          id="input-title"
          required
          label="Title"
          description="Please enter your prompt title."
          error="title error"
        >
          <Input id="input-title" />
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
        <InputWrapper
          id="input-image"
          label="Banner Image"
          description="Please enter select a banner image."
          error="image error"
        >
          {/* <Textarea id="input-image" autosize minRows={4} /> */}
          <Group position="apart" grow align>
            <Select
              onChange={() => {}}
              id="input-image"
              placeholder="Pick one"
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
              radius={"md"}
            />
          </Group>
        </InputWrapper>
      </Group>
      <Space h="25px" />
      <Group position="center">
        <Button radius="md" color="dark" size="xl">
          Publish prompt
        </Button>
      </Group>
    </div>
  );
};

export default CreatePromptPage;
