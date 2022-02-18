import { Title, Space, Group } from "@mantine/core";
import PromptCard from "./PromptCard";
import { Carousel } from "react-responsive-carousel";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect, useState, useContext } from "react";
import { LoginContext, adminContext, userContext } from "../global/context";

const HomePage = (props) => {
  const carouselWidth = 100;
  const [scroll, setScroll] = useWindowScroll();
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [followedPrompts, setFollowedPrompts] = useState([]);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const getRecentPrompts = async () => {
    // Fetch 5 recent prompts
    try {
      const response = await fetch(
        "https://and-then-backend.herokuapp.com/prompt/recentupdated",
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRecentPrompts(data);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getFollowedPrompts = async () => {
    // Fetch 5 recent prompts
    try {
      const response = await fetch(
        `https://and-then-backend.herokuapp.com/prompt/followed/${user._id}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setFollowedPrompts(data);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const allRecentPrompts = recentPrompts
    .slice(0, 3)
    .map((element) => (
      <PromptCard
        key={element._id}
        _id={element._id}
        title={element.title}
        rating={element.rating}
        genre={element.genre}
        updated={element.updatedAt}
        status={element.status}
        bannerURL={element.bannerURL}
        promptText={element.promptText}
        nodeCount={element.storyline[0].storyNodes.length}
        followerCount={element.followers.length}
      />
    ));

  const allFollowedPrompts = followedPrompts.map((element) => (
    <PromptCard
      key={element._id}
      _id={element._id}
      title={element.title}
      rating={element.rating}
      genre={element.genre}
      updated={element.updatedAt}
      status={element.status}
      bannerURL={element.bannerURL}
      promptText={element.promptText}
      nodeCount={element.storyline[0].storyNodes.length}
      followerCount={element.followers.length}
    />
  ));

  useEffect(() => {
    setScroll({ y: 0 });
    getRecentPrompts();
    if (user._id) {
      getFollowedPrompts();
    }
  }, [user]);
  return (
    <div style={{ padding: "5% 5% 5% 5%", margin: "auto" }}>
      {loggedIn ? (
        <div>
          <Title order={1} align="center">
            Followed Prompts
          </Title>
          <Space h="20px" />
          {/* <div style={{ width: "70%", margin:"auto" }}> */}
          <Carousel
            showThumbs={false}
            centerMode={true}
            centerSlidePercentage={followedPrompts.length >= 3 ? 33 : (followedPrompts.length >= 2 ? 50 : 100)}
            style={{ color: "red" }}
            showArrows={true}
            showStatus={false}
            infiniteLoop={true}
            useKeyboardArrows={true}
          >
            {allFollowedPrompts}
          </Carousel>
          <Space h="60px" />
        </div>
      ) : (
        ""
      )}

      <Title order={1} align="center">
        Trending Prompts
      </Title>
      <Space h="20px" />

      <Group position="center">{allRecentPrompts}</Group>

      <Space h="60px" />
      <Title order={1} align="center">
        Recently updated Prompts
      </Title>
      <Space h="20px" />

      <Group position="center">{allRecentPrompts}</Group>

      {/* </div> */}
    </div>
  );
};

export default HomePage;
