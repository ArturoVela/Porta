import { Turnstile } from "@marsidev/react-turnstile";
import { Box, Button, Field, Heading, HStack, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { PublicComment } from "@/types/content";
import { useContent } from "@/content/context";

const turnstileSiteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "0x4AAAAAAEoXHMY-TciCTywd";

export function Comments({ publicationId }: { publicationId: string }) {
  const { copy, locale } = useContent();
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/comments?publicationId=${encodeURIComponent(publicationId)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(copy.comments.unavailable);
        const payload = await response.json() as { data?: PublicComment[] };
        setComments(payload.data ?? []);
      })
      .catch(() => { if (!controller.signal.aborted) setMessage(copy.comments.unavailable); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [publicationId, copy.comments.unavailable]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ publicationId, name: data.get("name"), message: data.get("message"), turnstileToken: token }),
      });
      const payload = await response.json() as { data?: PublicComment; error?: string };
      if (!response.ok || !payload.data) throw new Error(locale === "en" ? copy.comments.publishError : payload.error ?? copy.comments.publishError);
      setComments((current) => [payload.data!, ...current]);
      setMessage(copy.comments.published);
      form.reset();
      setToken("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.comments.publishError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box borderTopWidth="1px" borderColor="app.border" pt={{ base: "10", md: "14" }}>
      <HStack mb="7"><MessageSquare size={22} /><Heading as="h2" fontSize="2xl">{copy.comments.title}</Heading></HStack>
      <form onSubmit={submit}>
        <Stack gap="5" maxW="2xl">
          <Field.Root required><Field.Label>{copy.comments.name}</Field.Label><Input name="name" required maxLength={80} autoComplete="name" minH="11" bg="app.panel" borderColor="app.border" /></Field.Root>
          <Field.Root required><Field.Label>{copy.comments.comment}</Field.Label><Textarea name="message" required maxLength={2000} minH="8rem" resize="vertical" bg="app.panel" borderColor="app.border" /></Field.Root>
          {turnstileSiteKey ? <Turnstile siteKey={turnstileSiteKey} onSuccess={setToken} onExpire={() => setToken("")} options={{ theme: "auto", language: locale }} /> : <Text color="app.muted" fontSize="sm">{copy.comments.configure}</Text>}
          <Button type="submit" alignSelf="start" minH="11" borderRadius="full" bg="app.text" color="app.canvas" loading={submitting} disabled={!turnstileSiteKey || !token}>{copy.comments.publish}</Button>
          {message ? <Text role="status" color="app.muted">{message}</Text> : null}
        </Stack>
      </form>
      <Stack mt="10" gap="0" aria-busy={loading}>
        {loading ? <Text color="app.muted">{copy.comments.loading}</Text> : null}
        {!loading && comments.length === 0 ? <Text color="app.muted">{copy.comments.empty}</Text> : null}
        {comments.map((comment) => <Box key={comment.id} py="6" borderTopWidth="1px" borderColor="app.border"><HStack justify="space-between" align="start" gap="4"><Text fontWeight="700">{comment.name}</Text><Text color="app.muted" fontSize="sm">{new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-PE", { dateStyle: "medium", timeZone: "America/Lima" }).format(new Date(comment.createdAt))}</Text></HStack><Text mt="3" color="app.muted" whiteSpace="pre-wrap">{comment.message}</Text></Box>)}
      </Stack>
    </Box>
  );
}
