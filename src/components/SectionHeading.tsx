import { Heading, Stack, Text } from "@chakra-ui/react";

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <Stack gap="4" maxW="3xl">
      <Heading as="h2" fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} letterSpacing="-.05em" lineHeight=".98">{title}</Heading>
      {description ? <Text color="app.muted" fontSize={{ base: "md", md: "lg" }} maxW="62ch">{description}</Text> : null}
    </Stack>
  );
}
