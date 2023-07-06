import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import AddFeed from "./AddFeed";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editMode?: boolean;
}

const FeedModal = ({ isOpen, onClose, editMode = false }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay backdropBlur="20px" />
    <ModalContent className="bg-slate-800 pb-3">
      <ModalHeader>{editMode ? "Edit" : "Add"} Feed</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <AddFeed className="flex" editMode={editMode} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default FeedModal;
