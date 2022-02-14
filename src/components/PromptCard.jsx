import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Divider,
  Space,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

const PromptCard = (props) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  const ratingColor = {
    Mature: "violet",
    Teen: "orange",
    Everyone: "blue",
  };
  const statusColor = {
    Completed: "green",
    Ongoing: "yellow",
  };
  const genreColor = (genre) => {
    switch (genre) {
      case "Fantasy":
        return "green";
      case "Thriller":
        return "grape";
      case "Adventure":
        return "indigo";
      case "Historical":
        return "orange";
      case "SciFi":
        return "yellow";
      case "Horror":
        return "teal";
      case "Romance":
        return "red";
      case "FanFiction":
        return "lime";
      case "Others":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ width: 340, margin: "auto", paddingBottom: "1.5%" }}>
      <Card
        component={Link}
        to="/prompt"
        shadow="sm"
        padding="lg"
        radius="lg"
        withBorder={true}
      >
        <Card.Section>
          <Image src={props.bannerURL} height={160} alt="banner image" />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Title order={2} weight={700}>
            {props.title}
          </Title>
          <Badge color={ratingColor[props.rating]} variant="light">
            {props.rating}
          </Badge>
        </Group>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="xs">Followers: 1000</Text>
          <Text size="xs">Nodes: 12</Text>
          <Badge color={genreColor(props.genre)} variant="outline">
            {props.genre}
          </Badge>
        </Group>
        <Space h="10px" />
        <Group position="apart">
          <Text size="xs">Last update: 28 July 2021</Text>
          <Badge color={statusColor[props.status]} variant="dot" radius="xl">
            {props.status}
          </Badge>
        </Group>

        <Space h="10px" />

        <Divider />
        <Space h="10px" />

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {props.promptText}
        </Text>
      </Card>
    </div>
  );
};

export default PromptCard;
