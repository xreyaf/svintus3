import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resetState } from '../../features/counter/counterSlice';

const Overlay = () => <ModalOverlay bg="none" backdropFilter="blur(10px)" />;
const ModalConfirmation = ({
  name,
  formattedName,
  onApprove,
}: {
  name: string;
  formattedName: string;
  onApprove: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<Overlay />);

  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(resetState(name)());
    onClose();
    onApprove();
  };

  return (
    <>
      <IconButton
        top="0"
        right="0"
        position="absolute"
        variant="ghost"
        colorScheme="gray"
        aria-label="See menu"
        icon={<DeleteIcon />}
        onClick={() => {
          setOverlay(<Overlay />);
          onOpen();
        }}
      />
      <Modal isCentered closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader> Обнуление счетчика для {formattedName}</ModalHeader>
          <ModalBody>
            <Text>Уверены?</Text>
          </ModalBody>
          <ModalFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Отменить
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Очистить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalConfirmation;
