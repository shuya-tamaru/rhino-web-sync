import { Button, Icon, useToast } from "@chakra-ui/react";
import { RiSave3Line } from "react-icons/ri";
import useFocusMesh from "../stores/useFocusMesh";
import axios from "axios";
import { useState } from "react";

export default function SaveChangeLog() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { changeLog, setChangeLog } = useFocusMesh((state) => state);

  const handelSaveChangeLog = async () => {
    setLoading(true);
    const json = JSON.stringify(changeLog);
    try {
      const res = await axios.post("/api", {
        body: json,
      });
      console.log(res);
      toast({
        title: "Change log saved successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setChangeLog([]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to save change log",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Button
      isLoading={loading}
      fontWeight={"bold"}
      color="#fff"
      bg="blue"
      leftIcon={<Icon as={RiSave3Line} boxSize={6} />}
      _hover={{ opacity: 0.6, bg: "blue" }}
      onClick={handelSaveChangeLog}
    >
      Save Change Log
    </Button>
  );
}
