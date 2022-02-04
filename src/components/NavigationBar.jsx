import { Text, Group } from "@mantine/core";

const NavigationBar = () => {
  return (
    <div>
      {/* <Text color="MantineColor" size="md">Default text</Text>
      <Text size="md">Default text</Text> */}
      <Group position="apart" spacing="xs">
        <Text>logo here</Text>
        <Text>Random Prompt</Text>
        <Text>Prompts</Text>
        <Text>I am new</Text>
        <Text>About</Text>
        <div style={{ display: "flex" }}>
        <div style={{height: "25px", width: "25px", backgroundColor: "gray", textAlign: "center", marginRight: "9px"}} >U</div>
          <Text>UserTest1 | Logout</Text>
        </div>
      </Group>
    </div>
  );
};

export default NavigationBar;
