import { Text, Group, Button } from "@mantine/core";
import { CheckIcon, Cross2Icon, Pencil1Icon } from "@modulz/radix-icons";

const StoryNode = (props) => {
  const text =
    "testtesttesttesttesttesttesttesttesttesttesttesttesttesttestte sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte sttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest test";
  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "40px",
        padding: "0.5% 1% 1% 2%",
        backgroundColor: "gray",
        borderRadius: "8px",
        color: "black",
      }}
    >
      <Text color="white" align="right">
        TestUser2
      </Text>
      <Text color="white" align="right">
        last edited: 13 Jan 2021
      </Text>
      <Text align="left" style={{ whiteSpace: "pre-line" }}>
        {text}
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
