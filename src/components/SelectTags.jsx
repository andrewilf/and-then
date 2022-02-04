import {Chips, Chip} from "@mantine/core";

const SelectTags = (props) => {
  return (
    <div>
      <Chips position="center">
        <Chip value="react">React</Chip>
        <Chip value="ng">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
        <Chip value="vue">Vue</Chip>
      </Chips>
    </div>
  );
};

export default SelectTags;
