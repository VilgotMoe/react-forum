import { Box, Text, Flex } from "@chakra-ui/react";

interface Props {
  accountName: any;
  isAdmin: boolean;
}

const PersonInfo = ({ accountName }: Props) => {
  return (
    <Box>
      <Flex alignItems={"center"}>
        <Text
          as="span"
          fontSize={"1.4vw"}
          color="blue.500"
          fontWeight="bold"
          align="center"
        >
          {accountName}
        </Text>
      </Flex>
    </Box>
  );
};

export default PersonInfo;
