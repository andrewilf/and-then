import { Title, Space, Group, Button, Input } from "@mantine/core";
import PromptCard from "./PromptCard";
import SelectTags from "./SelectTags";
import { MagnifyingGlassIcon, PlusIcon } from "@modulz/radix-icons";
const AllPromptsPage = () => {
  return (
    <div style={{ padding: "2% 5% 5% 5%" }}>
      <Title order={1} align="center">
        All Prompts
      </Title>
      <Space h="20px" />

      <Group position="apart">
        <Button leftIcon={<PlusIcon />} size="sm" radius="md" color="dark">
          Create Prompt
        </Button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            size="md"
            variant="default"
            radius="md"
            placeholder="Prompt name"
          />
          <Space w="5px" />
          <Button
            leftIcon={<MagnifyingGlassIcon />}
            size="sm"
            radius="md"
            color="dark"
          >
            Search
          </Button>
        </div>
      </Group>
      <SelectTags multiple={true}/>

      <Space h="40px" />
      <Group position="apart">
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>

      <Space h="80px" />
    </div>
  );
};

export default AllPromptsPage;
