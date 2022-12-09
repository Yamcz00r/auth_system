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
} from "@chakra-ui/react";
import { EmailIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);


  console.log(emailValid, passwordValid);

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const emailBlurHandler = () => {
    if (email.length === 0) {
      setEmailValid(false);
    } else {
      setEmailValid(true)
    }
  };

  const passwordBlurHandler = () => {
    if (password.length === 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true)
    }
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container mt='52' centerContent={true} maxW="container.lg">
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
        <form>
          <Flex
            alignItems="center"
            gap="5"
            justifyContent="center"
            flexDirection="column"
            marginTop="5"
          >
            <FormControl isInvalid={!emailValid}>
              <FormLabel fontSize='lg'>Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input onBlur={emailBlurHandler} onChange={emailChangeHandler} placeholder="Enter your email" type="email" />
              </InputGroup>
              {!emailValid && <FormErrorMessage>Email is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!passwordValid}>
              <FormLabel fontSize="lg">Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<ViewOffIcon color='gray.300' />}
                />
                <Input onBlur={passwordBlurHandler} onChange={passwordChangeHandler} placeholder="Enter your password" type="password" />
              </InputGroup>
              <Flex justifyContent='space-between'>
                {!passwordValid && <FormErrorMessage alignSelf='start'>Password is required</FormErrorMessage>}
                <FormHelperText
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                >
                  Forgot password ?
                </FormHelperText>
              </Flex>
             
            </FormControl>
            <Button type="submit" mt="3" size="md" fontSize="2xl" padding="5">
              Submit
            </Button>
            <Link style={{ textDecoration: "underline" }} href="/register">
              Dosen't have account? Create it already
            </Link>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}
