import { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import ForumInterface from "./ForumInterface";
import { Container, Heading, Text, useToast } from "@chakra-ui/react";

const StartInterface = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast();

  const handleGoogleSignIn = (displayName: string, isAdmin: boolean) => {
    setIsAuthenticated(true);
    setUserDisplayName(displayName);
    setIsAdmin(isAdmin);
    {
      isAdmin
        ? toast({
            title: `👋Welcome, ${displayName}`,
            description: "You are a Admin",
            status: "success",
            duration: 4000,
            isClosable: true,
          })
        : toast({
            title: `👋Welcome, ${displayName}`,
            description: "You are a Guest",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserDisplayName("");
    setIsAdmin(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <ForumInterface
          onSignOut={handleSignOut}
          userDisplayName={userDisplayName}
          isAdmin={isAdmin}
        />
      ) : (
        <Container>
          <Heading size={"2xl"} marginTop={"10vh"}>
            👋Welcome!
          </Heading>
          <Text
            fontSize={"1.3em"}
            fontWeight={"bold"}
            marginTop={"15vh"}
            marginBottom={"3vh"}
          >
            Sign In Options
          </Text>
          <GoogleSignInButton onSignIn={handleGoogleSignIn} />
        </Container>
      )}
    </>
  );
};

export default StartInterface;
