import { User } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../src/Context/AuthContext";
import { auth } from "../src/firebase-config";
import { signOut } from "firebase/auth";
import {
  Button,
  Flex,
  Heading,
  useToast,
  Container,
  Box,
  Text,
  ButtonGroup,
  useDisclosure
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface AuthContextType {
  user?: User;
}

export default function Dashboard() {
  const context: AuthContextType = useContext(AuthContext);
  const { user } = context;
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      router.push("/");
      toast({
        title: "Success",
        description: "Successfully logged out",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container mt="52" centerContent={true} maxW="container.lg">
      <Box
        textAlign="center"
        maxH="max-content"
        minW="lg"
        borderRadius="lg"
        boxShadow="xl"
        padding="7"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          gap="5"
          flexDirection="column"
        >
          <Heading>Dashboard</Heading>
          <Flex alignItems="center" gap="5">
            <Text fontSize="2xl" fontWeight="bold">
              Email: {user.email}
            </Text>
          </Flex>
          <ButtonGroup gap="4" size="lg">
            <Button>Change an Email</Button>
            <Button>Change Password</Button>
            <Button colorScheme='red'>Delete account</Button>
          </ButtonGroup>
          <Button onClick={signOutHandler} colorScheme="teal" size="lg">
            Sign out
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
