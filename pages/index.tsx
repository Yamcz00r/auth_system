import {
  Flex,
  Container,
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import ModalComponent from "../src/components/RetrivePasswordModal";
import { auth } from "../src/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const emailBlurHandler = () => {
    if (email.length === 0) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const passwordBlurHandler = () => {
    if (password.length === 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (emailValid === false || passwordValid === false) {
        toast({
          title: "Error",
          description: "Check that the email and password are not empty",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast({
        title: "Success",
        description: "Successfully logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.replace("/Dashboard");
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

  return (
    <Container style={{ height: "100vh" }} maxW="container.lg">
      <Flex height="full" justifyContent="center" alignItems="center">
        <Box
          textAlign="center"
          maxH="max-content"
          minW="lg"
          borderRadius="lg"
          boxShadow="xl"
          padding="7"
        >
          <Text as="b" fontSize="4xl">
            Login
          </Text>
          <form onSubmit={formSubmitHandler}>
            <Flex
              alignItems="center"
              gap="5"
              justifyContent="center"
              flexDirection="column"
              marginTop="5"
            >
              <FormControl isInvalid={!emailValid}>
                <FormLabel fontSize="lg">Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input
                    onBlur={emailBlurHandler}
                    onChange={emailChangeHandler}
                    placeholder="Enter your email"
                    type="email"
                  />
                </InputGroup>
                {!emailValid && (
                  <FormErrorMessage>Email is required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!passwordValid}>
                <FormLabel fontSize="lg">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<ViewOffIcon color="gray.300" />}
                  />
                  <Input
                    onBlur={passwordBlurHandler}
                    onChange={passwordChangeHandler}
                    placeholder="Enter your password"
                    type="password"
                  />
                </InputGroup>
                <Flex justifyContent="space-between">
                  {!passwordValid && (
                    <FormErrorMessage alignSelf="start">
                      Password is required
                    </FormErrorMessage>
                  )}
                  <FormHelperText
                    _hover={{ textDecoration: "underline" }}
                    cursor="pointer"
                    onClick={onOpen}
                  >
                    Forgot password ?
                  </FormHelperText>
                </Flex>
              </FormControl>
              <Button type="submit" mt="3" size="md" fontSize="2xl" padding="5">
                Submit
              </Button>
              <Link style={{ textDecoration: "underline" }} href="/Register">
                Dosen't have account? Create it already
              </Link>
            </Flex>
          </form>
        </Box>
      </Flex>
      <ModalComponent isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
