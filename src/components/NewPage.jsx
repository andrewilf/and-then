import { Title, Space, Group, Text, Blockquote, Skeleton } from "@mantine/core";

const NewPage = (props) => {
  return (
    <div style={{ padding: "5% 5% 5% 5%" }}>
      {props.quoteAuthor === "" ? (
        <div>
          <Skeleton height={15} mt={12} radius="xl" />
          <Skeleton height={15} mt={12} radius="xl" />
          <Skeleton height={15} mt={12} width="30%" radius="xl" />
        </div>
      ) : (
        <Blockquote cite={props.quoteAuthor}>{props.quote}</Blockquote>
      )}

      <Title order={1}>Welcome to And Then</Title>
      <Text> a collaborative writing platform where everyone can write!</Text>
      <Title order={2}>Prompt</Title>
      <Text>submit a prompt</Text>
      <Title order={2}>Participate</Title>
      <Text>Participate with the Community</Text>
      <Title order={2}>Publish</Title>
      <Text>Publish your story</Text>
    </div>
  );
};

export default NewPage;
