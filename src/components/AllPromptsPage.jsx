import {
  Title,
  Space,
  Group,
  Button,
  Input,
  Loader,
  Pagination,
  Center,
  Divider,
} from "@mantine/core";
import PromptCard from "./PromptCard";
import SelectTags from "./SelectTags";
import { MagnifyingGlassIcon, PlusIcon } from "@modulz/radix-icons";
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";
import { useState, useEffect } from "react";

const AllPromptsPage = () => {
  const [scroll, setScroll] = useWindowScroll();
  const navigate = useNavigate();
  const [promptsDisplay, setPromptsDisplay] = useState({
    docs: [],
    totalPages: 1,
  });
  const [activePage, setActivePage] = useState(1);
  const genreTags = process.env.REACT_APP_GENRE_TAGS.split(",");
  const [genreSelect, setGenreSelect] = useState([]);
  const [ratingSelect, setRatingSelect] = useState([]);
  const [statusSelect, setStatusSelect] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [loading, setLoading] = useState(false);
  //const pagination = usePagination({ total: 11, initialPage: 5 });
  //pagination.setPage(2)
  //setActivePage(3);

  const promptAPICall = async (page) => {
    let baseURL = `https://and-then-backend.herokuapp.com/prompt/search/${page}/?`;
    setLoading(true);
    if (genreSelect.length !== 0) {
      baseURL += `genre=${genreSelect}&`;
    }
    if (ratingSelect.length !== 0) {
      baseURL += `rating=${ratingSelect}&`;
    }
    if (statusSelect.length !== 0) {
      baseURL += `status=${statusSelect}&`;
    }
    if (nameSearch.length !== 0) {
      baseURL += `title=${nameSearch}`;
    }
    console.log(baseURL);
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      setPromptsDisplay(data);
      setLoading(false);
    } catch (error) {
      console.log("error>>>", error);
      setLoading(false);
    }
  };
  // console.log("genre: ", genreSelect);
  // console.log("rating: ", ratingSelect);
  // console.log("status: ", statusSelect);
  // console.log("name: ", nameSearch);

  const allPromptCards = promptsDisplay["docs"].map((element) => (
    <PromptCard
      title={element.title}
      rating={element.rating}
      genre={element.genre}
      updated={element.updatedAt}
      status={element.status}
      bannerURL={element.bannerURL}
      promptText={element.promptText}
    />
  ));

  useEffect(async () => {
    promptAPICall(activePage);
  }, [activePage]);

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
            id="title-search-input"
            size="md"
            variant="default"
            radius="md"
            placeholder="Prompt name"
            value={nameSearch}
            onChange={(e) => {
              setNameSearch(e.target.value);
            }}
          />
          <Space w="5px" />
          <Button
            id="title-search-input"
            leftIcon={<MagnifyingGlassIcon />}
            size="sm"
            radius="md"
            color="dark"
            onClick={() => {
              promptAPICall(1);
              setActivePage(1);
            }}
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
        <SelectTags
          tags={genreTags}
          value={genreSelect}
          setValue={setGenreSelect}
          multiple={true}
        />
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <SelectTags
          tags={["Everyone", "Teen", "Mature"]}
          value={ratingSelect}
          setValue={setRatingSelect}
          multiple={true}
        />
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <SelectTags
          tags={["Ongoing", "Completed"]}
          value={statusSelect}
          setValue={setStatusSelect}
          multiple={true}
        />
      </div>
      <Space h="xl" />
      <Center>
        <Pagination
          total={promptsDisplay.totalPages}
          withEdges
          color="dark"
          page={activePage}
          onChange={(page) => {
            setActivePage(page);
            setScroll({ y: 0 });
            console.log(page);
          }}
        />
      </Center>
      <Space h="40px" />
      <Group position="center">
        {loading ? <Loader color="gray" variant="dots" /> : allPromptCards}
      </Group>
      <Space h="40px" />
      <Center>
        <Pagination
          total={promptsDisplay.totalPages}
          withEdges
          color="dark"
          page={activePage}
          onChange={(page) => {
            setActivePage(page);
            setScroll({ y: 0 });
            console.log(page);
          }}
        />
      </Center>
    </div>
  );
};

export default AllPromptsPage;
