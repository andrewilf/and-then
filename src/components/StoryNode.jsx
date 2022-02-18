import { Text, Group, Button } from "@mantine/core";
import { CheckIcon, Cross2Icon, Pencil1Icon } from "@modulz/radix-icons";
import parse from "html-react-parser";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useModals } from "@mantine/modals";
import { useNotifications } from "@mantine/notifications";
import { useEffect } from "react";

const StoryNode = (props) => {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const modals = useModals();

  const openConfirmModal = () =>
    modals.openConfirmModal({
      closeOnConfirm: false,
      title: "Confirm delete node",
      children: (
        <Text color="red">
          Are you sure you want to delete this suggested node? It cannot be
          recovered once deleted.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {
        console.log("Cancel");
      },
      onConfirm: () => {
        console.log("Confirmed");
        //command to close modal
        deleteNode();
        modals.closeModal();
      },
    });
  const approveConfirmModal = () =>
    modals.openConfirmModal({
      closeOnConfirm: false,
      title: "Confirm add node",
      children: (
        <Text color="red">
          Are you sure you want to add this suggested node to the storyline? It
          cannot be removed from the prompt once added, all other proposed nodes
          will also be deleted.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {
        console.log("Cancel");
      },
      onConfirm: () => {
        console.log("Confirmed");
        //command to close modal
        approveNode();
        modals.closeModal();
      },
    });
  const deleteNode = async () => {
    const baseURL = `https://and-then-backend.herokuapp.com/node/removeproposed/${props._id}`;
    try {
      const response = await fetch(baseURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ storyline: props.storyline }),
      });
      const data = await response.json(); //.then(props.promptAPI());
      console.log(data);
      //navigate(`/prompt/${props.promptID}`)
      //window.location.reload(false);

      //props.setupdateToggle(!props.updateToggle)
      notifications.showNotification({
        title: "Node suggested",
        message: "Hey there, you deleted a suggested node!",
        color: "red",
        //  style: { backgroundColor: "red" },
      });
      const result = await props.promptAPI()
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  const approveNode = async () => {
    const baseURL = `https://and-then-backend.herokuapp.com/node/addtostoryline/${props._id}`;
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ storyline: props.storyline }),
      });
      const data = await response.json(); //.then(props.promptAPI());
      console.log(data);
      //navigate(`/prompt/${props.promptID}`)
      //await props.promptAPI();
      //window.location.reload(false);
      //props.setupdateToggle(!props.updateToggle)
      notifications.showNotification({
        title: "Node suggested",
        message: "Hey there, you added a suggested node to the storyline!",
        color: "green",
        //  style: { backgroundColor: "red" },
      });
      const result = await props.promptAPI()
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "40px",
        padding: "0.5% 1% 1% 2%",
        backgroundColor: "gray",
        borderRadius: "8px",
        opacity: "80%",
        color: "black",
      }}
    >
      <Text color="black" align="right">
        {props.author}
      </Text>
      <Text color="black" align="right">
        last edited:{" "}
        {parseISO(props.updatedAt).toLocaleDateString("en-SG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>
      <Text align="left" style={{ whiteSpace: "pre-line" }}>
        {parse(props.text)}
      </Text>
      <Group spacing="5px" position="right">
        {props.canEdit ? (
          <Button
            size="xs"
            radius="md"
            color="dark"
            onClick={() => {
              console.log("edit node");
              navigate(
                `/editnode/${props.promptID}/${props.storyline}/${props._id}`
              );
            }}
          >
            <Pencil1Icon />
          </Button>
        ) : (
          ""
        )}
        {props.canApprove || props.canEdit ? (
          <Button
            size="xs"
            radius="md"
            color="dark"
            onClick={() => {
              console.log("delete node");
              openConfirmModal();
            }}
          >
            <Cross2Icon />
          </Button>
        ) : (
          ""
        )}
        {props.canApprove ? (
          <Button
            size="xs"
            radius="md"
            color="dark"
            onClick={() => {
              console.log("approve node");
              approveConfirmModal();
            }}
          >
            <CheckIcon />
          </Button>
        ) : (
          ""
        )}
        <div style={{ width: "20px" }}> </div>
      </Group>
    </div>
  );
};

export default StoryNode;
