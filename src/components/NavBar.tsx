import { Badge, HStack, Image, Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import PersonInfo from "./PersonInfo";
import AdminActions from "./AdminActions";
import react from "../assets/react.svg";

interface Props {
  accountName: any;
  isAdmin: boolean;
}

const NavBar = ({ accountName, isAdmin }: Props) => {
  return (
    <>
      <HStack justifyContent={"space-between"} padding="10px">
        <Image src={react} w="5vw" />
        <HStack spacing={2}>
          <PersonInfo accountName={accountName} isAdmin={isAdmin} />
        </HStack>
        <HStack spacing={2}>
          {isAdmin && <AdminActions />}
          <Tooltip label="Not Implemented" fontSize="md">
            <AddIcon />
          </Tooltip>
          {isAdmin ? (
            <Badge marginLeft={"1"} colorScheme="blue" color="purple.500">
              ADMIN
            </Badge>
          ) : (
            <Badge marginLeft={"1"} colorScheme="blue" color="blue.500">
              GUEST{" "}
            </Badge>
          )}
          <ColorModeSwitch />
        </HStack>
      </HStack>
    </>
  );
};

export default NavBar;
