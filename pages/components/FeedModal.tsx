import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import AddFeed from "./AddFeed";
import EditFeed from "./EditFeed";
import { IFeed } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editFeed?: IFeed;
}

const FeedModal = ({ isOpen, onClose, editFeed }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay backdropBlur="20px" />
    <ModalContent className="bg-slate-800 pb-3">
      <ModalHeader>{editFeed ? "Edit" : "Add"} Feed</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {editFeed ? (
          <EditFeed className="flex" feed={editFeed} onClose={onClose} />
        ) : (
          <AddFeed className="flex" />
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default FeedModal;
