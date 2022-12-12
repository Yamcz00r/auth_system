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
  import { ViewOffIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import { User, sendPasswordResetEmail } from "firebase/auth";

  interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    user: User
  }
  
  export default function PasswordModal({
    isOpen,
    onClose,
    user
  }: ModalProps) {
  
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const toast = useToast();
  
    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
  
    const passwordBlurHandler = () => {
      if (password.length === 0) {
        setPasswordValid(false);
      } else {
        setPasswordValid(true);
      }
    };

    const updatePasswordHandler = async () => {
      try {
        onClose();
        toast({
          title: "Success",
          description: "Password is changed",
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
          <ModalHeader>Change your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Text>Enter your new password </Text>
              <Flex flexDirection='column' w='full' justifyContent='center' alignItems='center'>
                  <FormControl my='5' isInvalid={!passwordValid}>
                    <FormLabel fontSize="lg">Write your new password</FormLabel>
                    <InputGroup size='lg'>
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
                    {!passwordValid && (
                        <FormErrorMessage>Password is required</FormErrorMessage>
                    )}
                  </FormControl>
                  <Button onClick={updatePasswordHandler} my='5'>Change password</Button>
              </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  