import { Box, Text, Avatar, Flex } from "@chakra-ui/react";

interface Props {
  accountName: any;
  isAdmin: boolean;
}

const PersonInfo = ({ accountName }: Props) => {
  return (
    <Box>
      <Flex alignItems={"center"}>
        <Avatar
          size={{ sm: "sm", md: "md", lg: "md", xl: "md" }}
          fontSize={"2vw"}
          name={accountName}
          display={{ base: "none", md: "block" }}
        />
        <Text
          as="span"
          fontSize={"1.4vw"}
          marginLeft={"1.3vw"}
          color="blue.500"
          fontWeight="bold"
        >
          {accountName}
        </Text>
      </Flex>
    </Box>
  );
};

export default PersonInfo;
