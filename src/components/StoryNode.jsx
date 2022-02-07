import { Text, Group, Anchor } from "@mantine/core";

const StoryNode = () => {
  const text = "testtesttesttesttesttesttesttesttesttesttesttesttesttesttestte sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte  sttesttestte sttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest test";
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "0.5% 1% 2% 2%",
        backgroundColor: "gray",
        borderRadius: "8px",
        color: "black",
      }}
    >
      <Text color="white" align="right">TestUser2</Text>
      <Text color="white" align="right">last edited: 13 Jan 2021</Text>
      <Text style={{ whiteSpace: "pre-line" }}>{text}</Text>
    </div>
  );
};

export default StoryNode;
