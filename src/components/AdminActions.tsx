import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { dbb } from "../services/firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { DeleteIcon } from "@chakra-ui/icons";

const clearChat = async () => {
  try {
    const querySnapshot = await getDocs(collection(dbb, "messages"));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting messages:", error);
  }
};

const AdminActions = () => {
  return (
    <Menu>
      <MenuButton
        bg="blue.500"
        borderRadius={4}
        padding={"1"}
        w="10svw"
        fontSize={"1.4vw"}
      >
        Admin Panel
      </MenuButton>
      <MenuList>
        <MenuItem onClick={clearChat}>
          <DeleteIcon marginRight={"1vw"} />
          Clear Chat
        </MenuItem>
        <Text>Message Commands</Text>
        <Text color="gray.500">/ShowAdmins</Text>
      </MenuList>
    </Menu>
  );
};

export default AdminActions;
