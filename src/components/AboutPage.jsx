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
      <Text>
        And Then is an independent project which aims to create a collaborative
        writing platform for aspiring authors. Writing is a fun yet daunting
        task, why not work with others to help get your feet wet in creating a
        story from start to finish?
      </Text>
      <Space h="65px" />
      <Title>Feedback</Title>
      <Divider />
      <Text>
        Please send all feedback or bug reports to Andrew Faulkner. You should
        have my contact if you are a part of the Alpha launch :,)
      </Text>
      <Space h="65px" />
      <Title>Changelog</Title>
      <Divider />
      <Space h="15px" />
      <Title order={3}>version 0.6 (Alpha test)</Title>
      <ul>
        <li>basic functionality implemented</li>
      </ul>
      <Title order={3}>Upcoming features</Title>
      <ul>
        <li>The ability to end stories, currently is cosmetic</li>
        <li>Able to save stories as PDFs</li>
        <li>Profile Page works</li>
        <li>I am new page populated</li>
        <li>About page populated</li>
        <li>
          Trending prompts mechanism created(section currently just show recent
          prompts)
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
