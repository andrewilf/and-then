import {
  Title,
  Space,
  Group,
  Button,
  InputWrapper,
  TextInput,
  Textarea,
  Text,
  Select,
  Image,
  Center,
  Loader,
  useMantineTheme,
  Anchor,
  Grid,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext, adminContext, userContext } from "../global/context";
import { useModals } from "@mantine/modals";
import { Pencil1Icon } from "@modulz/radix-icons";
import { useEffect, useContext, useState } from "react";
const ProfilePage = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const modals = useModals();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [editState, setEditState] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [profileInfo, setProfileInfo] = useState({
    followedPrompts: [],
    ownedPrompts: [],
  });
  const [loading, setLoading] = useState(false);
  const ownedPromptLinks = profileInfo.ownedPrompts.map((element) => (
    <Anchor
      key={element._id}
      component={Link}
      variant="text"
      to={`/prompt/${element._id}`}
    >
      {element.title}
    </Anchor>
  ));
  const followedPromptLinks = profileInfo.followedPrompts.map((element) => (
    <Anchor
      key={element._id}
      component={Link}
      variant="text"
      to={`/prompt/${element._id}`}
    >
      {element.title}
    </Anchor>
  ));
  const changeUsername = async () => {
    //setLoading(true);
    try {
      const response = await fetch(
        `https://and-then-backend.herokuapp.com/user/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ username: username }),
        }
      );
      const data = await response.json();
      console.log(data);
      setUser({ ...user, username: username });
      // notifications.showNotification({
      //   title: "Username edited",
      //   message: "Hey there, your username has been updated!",
      //   color: "blue",

      // });
      // setLoading(false);
      // navigate(`/prompt/${promptID}`);
    } catch (error) {
      //setLoading(false);
      console.log("username change failed");
    }
  };

  const checkUsername = async (usernameToCheck) => {
    const baseURL = `https://and-then-backend.herokuapp.com/user/username/${usernameToCheck}`;
    //console.log(baseURL)
    try {
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        //body: JSON.stringify({ storyline: props.storyline }),
      });
      const data = await response.json(); //.then(props.promptAPI());
      console.log(data);
      if (!data.error) {
        setUsernameError("Invalid username");
        return false;
      } else {
        setUsernameError("");
        return true;
      }
    } catch (error) {
      console.log("error>>>", error);
      return false;
    }
  };

  const getProfile = async () => {
    const baseURL = `https://and-then-backend.herokuapp.com/user/profile/${user._id}`;
    //console.log(baseURL)
    try {
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        //body: JSON.stringify({ storyline: props.storyline }),
      });
      const data = await response.json(); //.then(props.promptAPI());
      console.log(data);
      setProfileInfo(data);
      setLoading(true);
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  const getFollowCount = (prompts) => {
    let total = 0;
    console.log(prompts);
    if (prompts.length !== 0) {
      for (let singlePrompt of prompts) {
        //console.log(prompt);
        total += singlePrompt.followers.length;
      }
      return total;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    setUsername(user.username);
    document.title = `Then - Profile`;
    if (user._id) {
      getProfile();
    }
  }, [user]);

  return (
    <div style={{ padding: "5% 5% 5% 5%", margin: "auto" }}>
      {loading ? (
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

          <Group position="center" align={"row"}>
            <Grid grow>
              <Grid.Col span={3}>
                <Title order={3}>Username: </Title>
              </Grid.Col>
              <Grid.Col span={3}>
                {editState ? (
                  <TextInput
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                    error={usernameError}
                  />
                ) : (
                  <Title order={3}>{user.username || "loading..."}</Title>
                )}
              </Grid.Col>
              <Grid.Col span={3}>
                <Button
                  radius="md"
                  color="dark"
                  leftIcon={<Pencil1Icon />}
                  onClick={async () => {
                    if (!editState) {
                      setEditState(true);
                    } else {
                      if (await checkUsername(username)) {
                        console.log("changing username");
                        await changeUsername();
                        setEditState(false);
                      } else if (username === user.username) {
                        console.log("no change");
                        setUsernameError("");
                        setEditState(false);
                      }
                    }
                  }}
                >
                  edit
                </Button>
              </Grid.Col>
            </Grid>
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
                  backgroundColor: "rgb(104, 104, 137)",
                  width: "100%",
                  border: "1px solid black",
                  borderRadius: "15px",
                  padding: "5%",
                  margin: "auto",
                  color: "white"
                }}
              >
                <Text>Owned Prompts: {profileInfo.ownedPrompts.length}</Text>
                <Text>
                  Followed Prompts: {profileInfo.followedPrompts.length}
                </Text>
                <Text>Favourite Genre: {profileInfo.favouriteGenre}</Text>
                <Text>
                  Followers: {getFollowCount(profileInfo.ownedPrompts)}
                </Text>
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
                  backgroundColor: "rgb(104, 104, 137)",
                  height: "300px",
                  border: "1px solid black",
                  borderRadius: "15px",
                  padding: "5%",
                  color: "white"
                }}
              >
                <Group spacing={"2px"} direction="column">
                  {profileInfo.ownedPrompts.length !== 0 ? (
                    ownedPromptLinks
                  ) : (
                    <div>
                      <Text>
                        {"No prompts currently. "}
                        <Anchor component={Link} to={`/createprompt`}>
                          Want to create some?
                        </Anchor>
                      </Text>
                    </div>
                  )}
                </Group>
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
                  backgroundColor: "rgb(104, 104, 137)",
                  height: "300px",
                  border: "1px solid black",
                  borderRadius: "15px",
                  padding: "5%",
                  color: "white"
                }}
              >
                <Group spacing={"2px"} direction="column">
                  {profileInfo.followedPrompts.length !== 0 ? (
                    followedPromptLinks
                  ) : (
                    <div>
                      <Text>
                        {"No prompts currently. "}
                        <Anchor component={Link} to={`/prompts`}>
                          Want to follow some?
                        </Anchor>
                      </Text>
                    </div>
                  )}
                </Group>
              </div>
            </div>
          </Group>
        </Group>
      ) : (
        <div style={{ height: "200px" }}>
          <Group position="center" direction="column">
            <Loader color="gray" size="xl" variant="dots" />
          </Group>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
