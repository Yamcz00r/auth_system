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
} from "@chakra-ui/react";
import { EmailIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase-config";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast({
        title: "Success",
        description: "Successfully created an account",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/Dashboard");
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
      <Flex justifyContent="center" alignItems="center" height="full">
        <Box
          textAlign="center"
          maxH="max-content"
          minW="lg"
          borderRadius="lg"
          boxShadow="xl"
          padding="7"
        >
          <Text as="b" fontSize="4xl">
            Create an account
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
                </Flex>
              </FormControl>
              <Button type="submit" mt="3" size="md" fontSize="2xl" padding="5">
                Submit
              </Button>
              <Link style={{ textDecoration: "underline" }} href="/">
                Already have an account ? Login here
              </Link>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}
