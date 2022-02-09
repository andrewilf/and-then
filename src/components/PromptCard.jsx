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

const PromptCard = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

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
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Title order={2} weight={700}>
            Letter Runner
          </Title>
          <Badge color="orange" variant="light">
            Teen
          </Badge>
        </Group>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="xs">Followers: 1000</Text>
          <Text size="xs">Nodes: 12</Text>
          <Badge color="orange" variant="outline">
            Thriller
          </Badge>
        </Group>
        <Space h="10px" />
        <Group position="apart">
          <Text size="xs">Last update: 28 July 2021</Text>
          <Badge color="yellow" variant="dot" radius="xl">
            Ongoing
          </Badge>
        </Group>

        <Space h="10px" />

        <Divider />
        <Space h="10px" />

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>

        {/* <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Book classic tour now
        </Button> */}
      </Card>
    </div>
  );
};

export default PromptCard;
