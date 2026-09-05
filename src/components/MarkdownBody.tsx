import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

export function MarkdownBody({ children }: { children: string }) {
  return (
    <Box className="prose" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8" maxW="72ch">
      <ReactMarkdown>{children}</ReactMarkdown>
    </Box>
  );
}
