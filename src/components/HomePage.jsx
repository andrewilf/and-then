import { Title, Space, Group } from "@mantine/core";
import PromptCard from "./PromptCard";
const HomePage = () => {
  return (
    <div style={{padding: "5% 5% 5% 5%"}}>
      <Title order={1} align="center">
        Trending Prompts
      </Title>
      <Space h="10px" />

      <Group position="apart">
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>

      <Space h="80px" />
      <Title order={1} align="center">
        Recent Prompts
      </Title>
      <Space h="10px" />

      <Group position="apart">
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>
    </div>
  );
};

export default HomePage;
