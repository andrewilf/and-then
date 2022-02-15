import { Title, Divider, Text, Space } from "@mantine/core";

const AboutPage = () => {
  return (
    <div
      style={{
        padding: "5% 5% 5% 5%",
      }}
    >
      <Title>About</Title>
      <Divider />
      <Text>this is an about section</Text>
      <Space h="65px" />
      <Title>Feedback</Title>
      <Divider />
      <Text>Submit feedback here</Text>
      <Space h="65px" />
      <Title>Changelog</Title>
      <Divider />
      <Space h="15px" />
      <Title order={3}>version 0.5</Title>
      <ul>
        <li>asdsda</li>
        <li>asdsda</li>
      </ul>
    </div>
  );
};

export default AboutPage;
