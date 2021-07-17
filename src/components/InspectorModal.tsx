import { Inspector } from "react-inspector";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

export const InspectorModal = ({
  json,
  onClose,
  isOpen,
}: {
  json: AnimationPlaybackEvent;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <>
          <ModalOverlay />
          <ModalContent height="80vh">
            <ModalCloseButton />
            <ModalHeader>🔍 JSON Inspector</ModalHeader>
            <ModalBody p={5} overflow="scroll" fontSize="1.2em">
              <Inspector data={json} expandLevel={3} />
            </ModalBody>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};
