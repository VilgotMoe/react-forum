import { Box, Text, Flex } from "@chakra-ui/react";

const PersonInfo = () => {
  return (
    <Box>
      <Flex alignItems={"center"}>
        <Text
          as="span"
          fontSize={"1.4vw"}
          color="blue.500"
          fontWeight="bold"
          align="center"
        ></Text>
      </Flex>
    </Box>
  );
};

export default PersonInfo;
