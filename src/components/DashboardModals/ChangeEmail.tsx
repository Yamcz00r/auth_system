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
  import { User, updateEmail } from "firebase/auth";
  
  interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    user: User
  }
  
  export default function EmailModal({
    isOpen,
    onClose,
    user
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

    const updateEmailHandler = async () => {
      try {
        await updateEmail(user, email);
        onClose();
        toast({
          title: "Success",
          description: "Email is changed",
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
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retrive your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Text>Enter your new email </Text>
              <Flex flexDirection='column' w='full' justifyContent='center' alignItems='center'>
                  <FormControl my='5' isInvalid={!emailValid}>
                    <FormLabel fontSize="lg">Write your new email</FormLabel>
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
                  <Button onClick={updateEmailHandler} my='5'>Change an email</Button>
              </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  