import { DeleteIcon } from "@chakra-ui/icons";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { dbb } from "../services/firebase";

interface MessageCardProps {
  username: string;
  message: string;
  timestamp: any;
  isAdmin: boolean;
  messageId: string;
  author: any;
}

const MessageCard: React.FC<MessageCardProps> = ({
  username,
  message,
  timestamp,
  isAdmin,
  messageId,
  author,
}) => {
  const formattedTimestamp =
    timestamp && timestamp.seconds
      ? new Date(timestamp.seconds * 1000).toLocaleString()
      : "Invalid Timestamp";

  const deleteMessage = async (messageId: string) => {
    try {
      if (!messageId) {
        console.error("MessageId is undefined.");
        return;
      }

      const messageDocRef = doc(dbb, "messages", messageId);

      if (messageDocRef.id) {
        await deleteDoc(messageDocRef);
        console.log("Message deleted successfully");
      } else {
        console.error("Invalid message document reference.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Stat
      borderBottom={"1px solid gray"}
      w="40%"
      overflow={"hidden"}
      margin={"auto"}
      borderRadius={"4"}
    >
      <StatLabel color={isAdmin ? "purple.500" : "blue.500"}>
        {username}
      </StatLabel>
      <StatNumber fontSize={"1em"}>{message}</StatNumber>
      <StatHelpText fontSize={".7em"}>
        {formattedTimestamp}
        {author === username && (
          <DeleteIcon
            color="red.500"
            marginLeft={"1vw"}
            marginBottom={".3vh"}
            onClick={() => deleteMessage(messageId)}
            cursor={"pointer"}
          />
        )}
      </StatHelpText>
    </Stat>
  );
};

export default MessageCard;
