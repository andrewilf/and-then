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
} from "@mantine/core";

const ProfilePage = () => {
  return (
    <div style={{ width: "70%", margin: "auto", padding: "5% 5% 5% 5%" }}>
      <Title align="center">Profile</Title>
      <Image
        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
        height={160}
        alt="Norway"
        radius={"md"}
      />
      <Text>Username: TestUser1</Text>
    </div>
  );
};

export default ProfilePage;
