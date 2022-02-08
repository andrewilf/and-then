import { Title, Space, Group } from "@mantine/core";
import PromptCard from "./PromptCard";
import { Carousel } from "react-responsive-carousel";
const HomePage = () => {
  const carouselWidth = 100/3
  return (
    <div style={{ padding: "5% 5% 5% 5%", margin: "auto"}}>
      <Title order={1} align="center">
        Trending Prompts
      </Title>
      <Space h="20px" />

      <Group position="center">
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>

      <Space h="60px" />
      <Title order={1} align="center">
        Recent Prompts
      </Title>
      <Space h="20px" />

      <Group position="center">
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>
      <Space h="60px" />
      <Title order={1} align="center">
        Followed Prompts
      </Title>
      <Space h="20px" />
      {/* <div style={{ width: "70%", margin:"auto" }}> */}
        <Carousel
          showThumbs={false}
          centerMode={true}
          centerSlidePercentage={carouselWidth}
          style={{ color: "red" }}
          showArrows={true}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
        >
          <PromptCard />
          <PromptCard />
          <PromptCard />
        </Carousel>
      {/* </div> */}
    </div>
  );
};

export default HomePage;
