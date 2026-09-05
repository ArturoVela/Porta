import { Box, Flex, Text } from "@chakra-ui/react";
import { Braces, Cloud, Database, PanelsTopLeft } from "lucide-react";
import type { ReactNode } from "react";

function Node({ label, detail, icon, top, left, emphasis = false }: { label: string; detail: string; icon: ReactNode; top: string; left: string; emphasis?: boolean }) {
  return (
    <Flex
      className={emphasis ? "system-map__pulse" : undefined}
      position="absolute"
      top={top}
      left={left}
      transform="translate(-50%, -50%)"
      direction="column"
      gap="1"
      w={{ base: "8.5rem", md: "10rem" }}
      p={{ base: "3", md: "4" }}
      bg={emphasis ? "app.text" : "app.panel"}
      color={emphasis ? "app.canvas" : "app.text"}
      borderWidth="1px"
      borderColor={emphasis ? "app.text" : "app.border"}
      borderRadius="2xl"
      boxShadow={emphasis ? "0 20px 50px rgba(17,26,42,.18)" : "none"}
    >
      <Box mb="2">{icon}</Box>
      <Text fontWeight="700" lineHeight="1.1">{label}</Text>
      <Text fontSize="xs" opacity=".72">{detail}</Text>
    </Flex>
  );
}

export function SystemMap() {
  return (
    <Box className="system-map" color="app.accent" bg="app.accent-subtle" borderWidth="1px" borderColor="app.border" borderRadius={{ base: "2xl", md: "3xl" }}>
      <Box className="system-map__line" top="24%" left="24%" width="46%" transform="rotate(17deg)" />
      <Box className="system-map__line" top="31%" left="66%" width="35%" transform="rotate(102deg)" />
      <Box className="system-map__line" top="70%" left="30%" width="38%" transform="rotate(-11deg)" />
      <Box className="system-map__line" top="42%" left="25%" width="33%" transform="rotate(69deg)" />
      <Node label="Interfaz" detail="Clara y accesible" icon={<PanelsTopLeft size={20} />} top="22%" left="24%" />
      <Node label="Producto" detail="Un flujo completo" icon={<Braces size={22} />} top="47%" left="55%" emphasis />
      <Node label="Datos" detail="Modelos útiles" icon={<Database size={20} />} top="76%" left="27%" />
      <Node label="Edge" detail="Rápido y observable" icon={<Cloud size={20} />} top="73%" left="79%" />
      <Text position="absolute" right="5" bottom="4" fontSize="xs" color="app.muted">De la necesidad al sistema</Text>
    </Box>
  );
}
