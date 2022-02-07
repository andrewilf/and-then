import React, { useState } from "react";
import parse from "html-react-parser";
import { RichTextEditor } from "@mantine/rte";
import { Title, Space, Group, Button } from "@mantine/core";
import "../App.css";
const CreateNodePage = () => {
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
  const [value, onChange] = useState(initialValue);
  const [display, setDisplay] = useState("");

//   const options = {
//     replace: (domNode) => {
//       if (domNode.name === "pre") {
//         const reactElement = domToReact(domNode.children, options);
//         return reactElement;
//       }
//     },
//   };

  return (
    <div style={{ padding: "5% 5% 5% 5%" }}>
      <Title order={1} align="center">
        Creating node for: Letter Runner
      </Title>
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
        onClick={() => {
          console.log(value);
          //const change = value.replace(" class=", " className=")
          //console.log(change)
          setDisplay(value);
        }}
      >
        Submit Node
      </Button>
      </Group>
      
      <div>{parse(display)}</div>
    </div>
  );
};

export default CreateNodePage;
