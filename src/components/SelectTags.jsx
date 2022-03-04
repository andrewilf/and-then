import { Chips, Chip, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";

const SelectTags = (props) => {
  const theme = useMantineTheme();
  const tags = props.tags ? props.tags : [""];
  const ChipsForTags = tags.map((element) => (
    <Chip key={element} value={element}>
      {element}
    </Chip>
  ));
  // useEffect(()=>{
  //   props.onClick()
  // },[value])
  return (
    <div>
      <Chips
        align="center"
        variant="filled"
        multiple={props.multiple}
        position="center"
        color="green"
        value={props.value}
        onChange={(e) => {
          props.setValue(e);
          if (props.setPage) {
            console.log("setting page to 1");
            props.setPage(1)
          }
        }}
        styles={{
          label: { color: "grey" },
          checked: { color: "white" },
          checkIcon: { color: "green" },
        }}
      >
        {/* <Chip value="fantasy">Fantasy</Chip>
        <Chip value="thriller">Thriller</Chip>
        <Chip value="adventure">Adventure</Chip>
        <Chip value="historical">Historical</Chip>
        <Chip value="scifi">SciFi</Chip>
        <Chip value="horror">Horror</Chip>
        <Chip value="romance">Romance</Chip>
        <Chip value="fanfiction">Fan Fiction</Chip>
        <Chip value="others">Others</Chip> */}
        {ChipsForTags}
      </Chips>
    </div>
  );
};

export default SelectTags;
