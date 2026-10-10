import { Button, Stack, Text } from "@chakra-ui/react";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/content/context";
import { copyText } from "@/lib/contact";

export function CopyEmail() {
  const { content, copy } = useContent();
  const [result, setResult] = useState<"copied" | "blocked" | null>(null);
  return <Stack gap="1" align="start" className="copy-email">
    <Button type="button" variant="plain" minH="11" borderRadius="0" px="0" color="app.accent" onClick={async () => setResult(await copyText(content.site.email))}><Copy size={15} aria-hidden="true" />{copy.contact.copyEmail}</Button>
    {result && <Text role="status" fontSize="sm" color="app.muted">{result === "copied" ? copy.contact.copied : copy.contact.copyBlocked}</Text>}
  </Stack>;
}
