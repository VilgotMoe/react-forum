import React, { useState, useEffect } from "react";
import { Stack, Button, Box, Input } from "@chakra-ui/react";
import MessageCard from "./MessageCard";
import { dbb } from "../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { adminEmails } from "./GoogleSignInButton";
import NavBar from "./NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface Message {
  username: string;
  message: string;
  timestamp: any;
  isAdmin: boolean;
  messageId: string;
}

interface ForumInterfaceProps {
  onSignOut: () => void;
  userDisplayName?: string;
  isAdmin: boolean;
}

const ForumInterface: React.FC<ForumInterfaceProps> = ({
  onSignOut,
  userDisplayName,
  isAdmin,
}) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(dbb, "messages"), (snapshot) => {
      const messagesData: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Message;
        return {
          ...data,
          messageId: doc.id,
        };
      });

      // Sort messages based on timestamp in descending order (newest first)
      messagesData.sort((a, b) => b.timestamp - a.timestamp);
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    try {
      setLoading(true);
      if (message.trim()) {
        if (message.startsWith("/") && isAdmin) {
          if (message === "/ShowAdmins") {
            alert(adminEmails);
          }
        } else {
          const timestamp = serverTimestamp();
          const messageRef = await addDoc(collection(dbb, "messages"), {
            username: userDisplayName ?? "DefaultUsername",
            message,
            timestamp,
            isAdmin,
          });

          // Retrieve the auto-generated message ID
          const messageId = messageRef.id;

          // Pass the messageId to the MessageCard component
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              username: userDisplayName ?? "DefaultUsername",
              message,
              timestamp,
              isAdmin,
              messageId,
            },
          ]);

          setMessage("");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar accountName={userDisplayName} isAdmin={isAdmin} />
      <Stack mx="auto" spacing={4} borderRadius="md" scrollBehavior={"smooth"}>
        <Box
          w="100%"
          h="60svh"
          maxH={"60svh"}
          borderRadius={"10"}
          overflowY="auto"
        >
          {messages.map((msg, index) => {
            return (
              <MessageCard
                key={index}
                {...msg}
                messageId={msg.messageId}
                author={userDisplayName}
              />
            );
          })}
        </Box>

        <Box>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            w="20vw"
            mx="auto"
            m="3"
          />
          {loading ? (
            <Button onClick={sendMessage} w="15vw" mx="auto" isLoading></Button>
          ) : (
            <Button onClick={sendMessage} w="15vw" mx="auto">
              Send
            </Button>
          )}
        </Box>
        <Button
          onClick={onSignOut}
          colorScheme="teal"
          variant="outline"
          mt="auto"
          w="50vw"
          mx="auto"
        >
          Sign Out
        </Button>
      </Stack>
    </>
  );
};

export default ForumInterface;
