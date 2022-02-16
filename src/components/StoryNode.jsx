import { Text, Group, Button } from "@mantine/core";
import { CheckIcon, Cross2Icon, Pencil1Icon } from "@modulz/radix-icons";
import parse from "html-react-parser";
import { parseISO } from "date-fns";

const StoryNode = (props) => {
  const htmlText =
    "<p>Your initial <strong>html value</strong> or an empty string to init editor without value</p><p>asdasdasdt editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valut editor without valu</p>";
  const stringText =
    "testtesttesttesttesttesttesttesttesttesttesttesttesttesttestte sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte sttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest test";
  
    return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "40px",
        padding: "0.5% 1% 1% 2%",
        backgroundColor: "gray",
        borderRadius: "8px",
        opacity: "80%",
        color: "black",
      }}
    >
      <Text color="black" align="right">
        {props.author}
      </Text>
      <Text color="black" align="right">
        last edited:{" "}
        {parseISO(props.updatedAt).toLocaleDateString("en-SG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>
      <Text align="left" style={{ whiteSpace: "pre-line" }}>
        {parse(props.text)}
      </Text>
      <Group spacing="5px" position="right">
        {props.canEdit ? (
          <Button size="xs" radius="md" color="dark">
            <Pencil1Icon />
          </Button>
        ) : (
          ""
        )}
        {props.canApprove ? (
          <Button size="xs" radius="md" color="dark">
            <Cross2Icon />
          </Button>
        ) : (
          ""
        )}
        {props.canApprove ? (
          <Button size="xs" radius="md" color="dark">
            <CheckIcon />
          </Button>
        ) : (
          ""
        )}
        <div style={{ width: "20px" }}> </div>
      </Group>
    </div>
  );
};

export default StoryNode;
