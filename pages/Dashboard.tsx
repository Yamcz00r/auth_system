import {
  sendPasswordResetEmail,
  User,
  signOut,
  deleteUser,
} from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../src/Context/AuthContext";
import { auth } from "../src/firebase-config";
import {
  Button,
  Flex,
  Heading,
  useToast,
  Container,
  Box,
  Text,
  ButtonGroup,
  useDisclosure,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChangeEmail from "../src/components/DashboardModals/ChangeEmail";
interface AuthContextType {
  user?: User;
}

export default function Dashboard() {
  const context: AuthContextType = useContext(AuthContext);
  const { user } = context;
  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: emailIsOpen,
    onOpen: emailOnOpen,
    onClose: emailOnClose,
  } = useDisclosure();

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
    return (
      <Center style={{ height: "100vh" }}>
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Spinner
            thickness="7px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text fontSize="2xl" as="b">
            Loading
          </Text>
        </Flex>
      </Center>
    );
  }

  const passwordUpdateHandler = async () => {
    sendPasswordResetEmail(auth, user.email!);
    toast({
      title: "Success",
      description: "We send you an email with password reset link",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    await signOut(auth);
  };

  const deleteUserHandler = async () => {
    try {
      await deleteUser(user);
      toast({
        title: "Success",
        description: "Successfully deleted your account",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.replace("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      style={{ height: "100vh" }}
      centerContent={true}
      maxW="container.lg"
    >
      <Flex height="full" justifyContent="center" alignItems="center">
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
              <Button onClick={emailOnOpen}>Change an Email</Button>
              <Button onClick={passwordUpdateHandler}>Change Password</Button>
              <Button onClick={deleteUserHandler} colorScheme="red">
                Delete account
              </Button>
            </ButtonGroup>
            <Button onClick={signOutHandler} colorScheme="teal" size="lg">
              Sign out
            </Button>
          </Flex>
        </Box>
      </Flex>
      <ChangeEmail user={user} isOpen={emailIsOpen} onClose={emailOnClose} />
    </Container>
  );
}
