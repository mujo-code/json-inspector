import { render } from "react-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { InspectorModal } from "./InspectorModal";
import { motion, useDragControls } from "framer-motion";
import { Global } from "@emotion/react";
import { useRef, useState } from "react";

export const InspectorApp = ({ json }: { json: any }) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dragging, setIsDragging] = useState<boolean>(false);
  const dragControls = useDragControls();

  return (
    <>
      <Box
        ref={ref}
        position="fixed"
        top="0"
        width="35px"
        right="0"
        bottom="0"
        zIndex={-1}
      ></Box>
      <motion.div
        drag
        dragConstraints={ref}
        style={{
          position: "fixed",
          top: 100,
          right: 0,
          width: "35px",
          height: "35px",
          zIndex: 1,
        }}
        dragControls={dragControls}
        onTransitionEndCapture={() => {
          setIsDragging(false);
        }}
        whileDrag={{ scale: 1.2, right: 5 }}
        onDrag={() => {
          setIsDragging(true);
        }}
        onDragEnd={() => {
          setTimeout(() => {
            setIsDragging(false);
          }, 300);
        }}
        onMouseUp={() => {
          if (!dragging) {
            setIsOpen(true);
          }
        }}
      >
        <Box
          userSelect="none"
          boxSizing="content-box"
          borderRadius="45px"
          width="35px"
          height="35px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="blue.50"
          boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.2)"
          css={{
            cursor: "grab",
            ":active": {
              cursor: "grabbing",
            },
          }}
          border="5px solid #fff"
          borderColor="blue.50"
        >
          🔍
        </Box>
      </motion.div>
      <InspectorModal
        json={json}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const renderContent = (json: any) => {
  const el = document.createElement("div");
  el.id = "inspector-app";
  document.body.appendChild(el);

  render(
    <ChakraProvider>
      <Global
        styles={{
          "html, body": {
            height: "100%",
          },
        }}
      />
      <InspectorApp json={json} />
    </ChakraProvider>,
    el
  );
};
