import { Heading, Stack, Text } from "@chakra-ui/react";

export function SectionHeading({ title, description, as = "h2" }: { title: string; description?: string; as?: "h1" | "h2" }) {
  return (
    <Stack gap="4" maxW="3xl">
      <Heading as={as} fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} letterSpacing="-.05em" lineHeight=".98">{title}</Heading>
      {description ? <Text color="app.muted" fontSize={{ base: "md", md: "lg" }} maxW="62ch">{description}</Text> : null}
    </Stack>
  );
}
