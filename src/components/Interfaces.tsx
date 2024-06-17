import useFocusMesh from "@/stores/useFocusMesh";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import SaveChangeLog from "./SaveChangeLog";
import { AiFillEdit } from "react-icons/ai";
import { RiSave3Line } from "react-icons/ri";

export default function Interfaces() {
  const focusMesh = useFocusMesh((state) => state.focusMesh);
  const { changeLog, setChangeLog } = useFocusMesh((state) => state);
  const userData = focusMesh?.userData;
  const id = userData ? userData.id : "";
  const text = userData ? userData.ObjectLayer : "";

  const [edit, setEdit] = useState(false);
  const [userText, setUserText] = useState("");

  const userDataArray = Object.entries(userData || {});
  const haveUserData = userDataArray.length > 0;

  const handleEdit = () => {
    if (edit && focusMesh) {
      const findLog = changeLog.find((log) => log.meshId === id);
      if (findLog) {
        const newChangeLog = changeLog.map((log) => {
          if (log.meshId === id) {
            return {
              ...log,
              userText: { key: "ObjectLayer", value: userText },
            };
          }
          return log;
        });
        setChangeLog(newChangeLog);
      } else {
        setChangeLog([
          ...changeLog,
          {
            meshId: id,
            userText: { key: "ObjectLayer", value: userText },
          },
        ]);
      }
      setEdit(false);
      setUserText("");
    } else {
      setEdit(true);
    }
  };

  useEffect(() => {
    setUserText(text);
  }, [text]);

  return (
    <>
      <Box h="95%" p={"16px"} overflow={"auto"}>
        <Heading as="h3" size="md" mb="8px">
          Selected Object Information
        </Heading>
        <TableContainer mt="5px">
          <Table size={"sm"}>
            <Tbody fontSize={"13px"}>
              {userDataArray.map(([key, value]) => (
                <Tr key={value}>
                  <Td
                    border={"1px solid #888"}
                    w="100px"
                    bg="#888"
                    color={"#fff"}
                    fontWeight={"semibold"}
                  >
                    {key}
                  </Td>
                  <Td border={"1px solid #999"}>{value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {haveUserData && (
          <>
            <Flex w="100%" my="8px" justify={"space-between"}>
              <Heading as="h3" size="md">
                Edit Information
              </Heading>
              <Center>
                <Button
                  bg={"#000"}
                  leftIcon={edit ? <RiSave3Line /> : <AiFillEdit />}
                  size="sm"
                  _hover={{ opacity: 0.8 }}
                  onClick={handleEdit}
                >
                  {edit ? "Save" : "Edit"}
                </Button>
              </Center>
            </Flex>
            <TableContainer mt="5px">
              <Table size={"sm"}>
                <Tbody fontSize={"13px"}>
                  {userDataArray.map(([key, value]) => (
                    <Tr key={value}>
                      <Td
                        border={"1px solid #888"}
                        w="100px"
                        bg="#888"
                        color={"#fff"}
                        fontWeight={"semibold"}
                      >
                        {key}
                      </Td>
                      {key !== "id" && edit ? (
                        <Td border={"1px solid #999"} p={1}>
                          <Input
                            p={1}
                            defaultValue={userText}
                            onChange={(e) => setUserText(e.target.value)}
                          />
                        </Td>
                      ) : (
                        <Td border={"1px solid #999"}>{value}</Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Heading as="h3" size="md" my="8px">
              Change Log
            </Heading>
            <TableContainer mt="5px">
              <Table size={"sm"}>
                <Tbody fontSize={"13px"}>
                  {changeLog.map((log, index) => (
                    <Fragment key={index}>
                      <Tr>
                        <Td
                          minW={"200px"}
                          border={"1px solid #999"}
                          w="100px"
                          bg="#888"
                          color={"#fff"}
                          fontWeight={"semibold"}
                          wordBreak={"break-all"}
                          whiteSpace={"normal"}
                        >
                          {"id"}
                        </Td>
                        <Td
                          minW={"200px"}
                          border={"1px solid #999"}
                          w="100px"
                          fontWeight={"semibold"}
                          wordBreak={"break-all"}
                          whiteSpace={"normal"}
                          colSpan={3}
                        >
                          {log.meshId}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td
                          border={"1px solid #999"}
                          w="100px"
                          bg="#888"
                          color={"#fff"}
                        >
                          {"position"}
                        </Td>
                        <Td border={"1px solid #999"} maxW={"20px"}>
                          {log.moveVector
                            ? log.moveVector.x.toFixed(2)
                            : "no change"}
                        </Td>
                        <Td border={"1px solid #999"} maxW={"20px"}>
                          {log.moveVector
                            ? log.moveVector.y.toFixed(2)
                            : "no change"}
                        </Td>
                        <Td border={"1px solid #999"} maxW={"20px"}>
                          {log.moveVector
                            ? log.moveVector.z.toFixed(2)
                            : "no change"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td
                          border={"1px solid #999"}
                          borderBottom={"2px dashed #666"}
                          w="100px"
                          bg="#888"
                          color={"#fff"}
                        >
                          {"Information"}
                        </Td>
                        <Td
                          border={"1px solid #999"}
                          borderBottom={"2px dashed #666"}
                          maxW={"20px"}
                          wordBreak={"break-all"}
                          whiteSpace={"normal"}
                          colSpan={3}
                        >
                          {log.userText ? log.userText.value : "no change"}
                        </Td>
                      </Tr>
                    </Fragment>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
      <Flex justify={"end"} w="100%" h="5%" p="16px" alignItems={"end"}>
        <SaveChangeLog />
      </Flex>
    </>
  );
}
