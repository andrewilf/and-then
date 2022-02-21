import {
  Title,
  Space,
  Group,
  Button,
  InputWrapper,
  Input,
  Textarea,
  Text,
  Select,
  Image,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { LoginContext, adminContext, userContext } from "../global/context";
import { Carousel } from "react-responsive-carousel";
import { useModals } from "@mantine/modals";
import { Pencil1Icon } from "@modulz/radix-icons";
import PromptCard from "./PromptCard";
import { useEffect, useContext, useState } from "react";
const ProfilePage = () => {
  const theme = useMantineTheme();
  const modals = useModals();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [username, setUsername] = useState("");
  const openConfirmModal = () =>
    modals.openConfirmModal({
      closeOnConfirm: false,
      title: "Edit Username",
      children: (
        <InputWrapper
          id="input-username"
          required
          description="Please enter new username."
          error="username already in use"
        >
          <Input id="input-username" onChange={setUsername} value={username} />
        </InputWrapper>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log("Confirmed");
        //command to close modal
        modals.closeModal();
      },
    });
  useEffect(() => {
    setUsername(user.username);
  }, [user]);

  return (
    <div style={{ width: "100%", padding: "5% 3% 5% 3%" }}>
      <Group direction="column" position="center" grow>
        <Title align="center">Profile</Title>
        <Center>
          <Image
            src="https://media.istockphoto.com/vectors/silhouette-of-a-head-vector-id515660465?k=20&m=515660465&s=612x612&w=0&h=FFGsoAtgMdbEWgtzQOq_wMZrQP9S_C85T2-9mix6hdg="
            height={190}
            width={190}
            alt="profile"
            radius={"md"}
          />
        </Center>

        <Group position="center">
          <Title order={3}>Username: {username}</Title>
          <Button
            radius="md"
            color="dark"
            leftIcon={<Pencil1Icon />}
            onClick={openConfirmModal}
          >
            edit
          </Button>
        </Group>
        <Group position="center" grow>
          <div
            style={{
              marginBottom: "auto",
            }}
          >
            <Title align="center" order={4}>
              Stats
            </Title>
            <div
              style={{
                backgroundColor: theme.colors.dark[7],
                width: "100%",
                border: "1px solid black",
                borderRadius: "15px",
                padding: "5%",
                margin: "auto",
              }}
            >
              <Text>Owned Prompts: 5</Text>
              <Text>Followed Prompts: 100</Text>
              <Text>Contributed Nodes: 10</Text>
              <Text>Favourite Genre: Thriller</Text>
            </div>
          </div>
          <div
            style={{
              marginBottom: "auto",
            }}
          >
            <Title align="center" order={4}>
              Owned prompts
            </Title>
            <div
              style={{
                backgroundColor: theme.colors.dark[7],
                height: "300px",
                border: "1px solid black",
                borderRadius: "15px",
                padding: "5%",
              }}
            >
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
            </div>
          </div>
          <div
            style={{
              marginBottom: "auto",
            }}
          >
            <Title align="center" order={4}>
              Followed prompts
            </Title>
            <div
              style={{
                backgroundColor: theme.colors.dark[7],
                height: "300px",
                border: "1px solid black",
                borderRadius: "15px",
                padding: "5%",
              }}
            >
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
              <Text>Letter Runner</Text>
            </div>
          </div>
        </Group>
      </Group>
      <Title order={2} align="center">
        <Space h="25px" />
        Recently updated Prompts
      </Title>
      <Space h="20px" />
      {/* <Carousel
        showThumbs={false}
        style={{ color: "red" }}
        showArrows={true}
        showStatus={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
      > */}
      <Group spacing="md">
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </Group>
      {/* <Group spacing="xs" position="left">
          <PromptCard />
          <PromptCard />
          <PromptCard />
          <PromptCard />
        </Group> */}
      {/* </Carousel> */}
    </div>
  );
};

export default ProfilePage;
