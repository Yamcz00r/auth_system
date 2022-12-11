import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Flex,
  Text,
  useToast
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalComponent({
  isOpen,
  onClose
}: ModalProps) {

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const toast = useToast();

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

  const passwordChangeHandler = async () => {
    await sendPasswordResetEmail(auth, email);
    toast({
      title: "Success",
      description: "We send you a link to change password. Check spam folder",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Retrive your password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text>Enter your email so we can send you an email with a link to the password reset page </Text>
            <Flex flexDirection='column' w='full' justifyContent='center' alignItems='center'>
                <FormControl my='5' isInvalid={!emailValid}>
                  <FormLabel fontSize="lg">Write your email</FormLabel>
                  <InputGroup size='lg'>
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
                <Button onClick={passwordChangeHandler} my='5'>Send an Email</Button>
            </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
