import {
  Title,
  Space,
  Group,
  Button,
  Input,
  Pagination,
  Center,
} from "@mantine/core";
import PromptCard from "./PromptCard";
import SelectTags from "./SelectTags";
import { MagnifyingGlassIcon, PlusIcon } from "@modulz/radix-icons";
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";

const AllPromptsPage = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  //const pagination = usePagination({ total: 11, initialPage: 5 });
  //pagination.setPage(2)
  //setActivePage(3);
  const genreTags = process.env.REACT_APP_GENRE_TAGS.split(",");
  return (
    <div style={{ padding: "5% 5% 3% 5%" }}>
      <Title order={1} align="center">
        All Prompts
      </Title>
      <Space h="20px" />

      <Group position="apart">
        <Button
          leftIcon={<PlusIcon />}
          size="sm"
          radius="md"
          color="dark"
          onClick={() => navigate("/createprompt")}
        >
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
            onClick={() => setActivePage(2)}
          >
            Search
          </Button>
        </div>
      </Group>
      <div
        style={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "1%",
        }}
      >
        <SelectTags tags={genreTags} multiple={true} />
        <Space h="md" />
        <SelectTags tags={["Everyone", "Teen", "Mature"]} multiple={true} />
        <Space h="md" />
        <SelectTags tags={["Ongoing", "Completed"]} multiple={true} />
      </div>

      <Space h="40px" />
      <Group position="center">
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>
      <Space h="40px" />
      <Center>
        <Pagination
          total={10}
          withEdges
          color="dark"
          page={activePage}
          onChange={(page) => {
            setActivePage(page);
            scrollTo({ y: 0 });
            console.log(page);
          }}
        />
      </Center>
    </div>
  );
};

export default AllPromptsPage;
