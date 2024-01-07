// GoogleSignInButton.tsx
import { Button } from "@chakra-ui/react";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const adminEmails = ["vilgot346@gmail.com"];
interface GoogleSignInButtonProps {
  onSignIn: (displayName: string, isAdmin: boolean) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSignIn,
}) => {
  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const isAdmin = adminEmails.includes((user.email || "").toLowerCase());
      const displayName = user.displayName || "Guest";
      onSignIn(displayName, isAdmin);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Button
      onClick={handleSignInWithGoogle}
      colorScheme="whatsapp"
      variant="outline"
    >
      Sign In with Google
    </Button>
  );
};

export default GoogleSignInButton;
