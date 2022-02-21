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
  ScrollArea,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { parseISO } from "date-fns";
import variousVariables from "./variousVariables";

const PromptCard = (props) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  //console.log(props.nodeCount)
  return (
    <div style={{ width: 360, margin: "auto", paddingBottom: "1.5%" }}>
      <Card
        component={Link}
        to={`/prompt/${props._id}`}
        shadow="sm"
        padding="lg"
        radius="lg"
        withBorder={true}
      >
        <Card.Section>
          <Image
            src={props.bannerURL}
            height={160}
            alt="banner image"
            withPlaceholder
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Title order={2} weight={700}>
            {props.title}
          </Title>
        </Group>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="xs">Followers: {props.followerCount || "0"}</Text>
          <Text size="xs">Nodes: {props.nodeCount || "0"}</Text>
          <Badge
            color={variousVariables.genreColor(props.genre)}
            variant="outline"
          >
            {props.genre}
          </Badge>
        </Group>
        <Space h="10px" />

        <Group position="right">
          <Badge
            color={variousVariables.ratingColor[props.rating]}
            variant="light"
          >
            {props.rating}
          </Badge>
        </Group>
        <Space h="10px" />
        <Group position="apart">
          <Text size="xs">
            Last update:{" "}
            {parseISO(props.updated).toLocaleDateString("en-SG", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <Badge
            color={variousVariables.statusColor[props.status]}
            variant="dot"
            radius="xl"
          >
            {props.status}
          </Badge>
        </Group>

        <Space h="10px" />

        <Divider />
        <Space h="10px" />

        {/* <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5,  height: "70px"}}> */}
        <ScrollArea style={{ height: 90 }} offsetScrollbars>
          {props.promptText}
        </ScrollArea>
        {/* </Text> */}
      </Card>
    </div>
  );
};

export default PromptCard;
