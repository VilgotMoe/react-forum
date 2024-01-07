import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import StartInterface from "./components/StartInterface";

function App() {
  return (
    <ChakraProvider>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "main"`,
        }}
        templateColumns="1fr"
        gap={4}
      >
        <GridItem area="nav"></GridItem>
        <GridItem area="main" textAlign={"center"}>
          <StartInterface />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
