import { Turnstile } from "@marsidev/react-turnstile";
import { Box, Button, Field, Heading, HStack, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { PublicComment } from "@/types/content";

const turnstileSiteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "0x4AAAAAAEoXHMY-TciCTywd";

export function Comments({ publicationId }: { publicationId: string }) {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/comments?publicationId=${encodeURIComponent(publicationId)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Los comentarios no están disponibles en este momento.");
        const payload = await response.json() as { data?: PublicComment[] };
        setComments(payload.data ?? []);
      })
      .catch(() => { if (!controller.signal.aborted) setMessage("Los comentarios no están disponibles en este momento."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [publicationId]);

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
      if (!response.ok || !payload.data) throw new Error(payload.error ?? "No se pudo publicar el comentario.");
      setComments((current) => [payload.data!, ...current]);
      setMessage("Comentario publicado.");
      form.reset();
      setToken("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo publicar el comentario.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box borderTopWidth="1px" borderColor="app.border" pt={{ base: "10", md: "14" }}>
      <HStack mb="7"><MessageSquare size={22} /><Heading as="h2" fontSize="2xl">Conversación</Heading></HStack>
      <form onSubmit={submit}>
        <Stack gap="5" maxW="2xl">
          <Field.Root required><Field.Label>Nombre</Field.Label><Input name="name" required maxLength={80} autoComplete="name" bg="app.panel" borderColor="app.border" /></Field.Root>
          <Field.Root required><Field.Label>Comentario</Field.Label><Textarea name="message" required maxLength={2000} minH="8rem" resize="vertical" bg="app.panel" borderColor="app.border" /></Field.Root>
          {turnstileSiteKey ? <Turnstile siteKey={turnstileSiteKey} onSuccess={setToken} onExpire={() => setToken("")} options={{ theme: "auto", language: "es" }} /> : <Text color="app.muted" fontSize="sm">Configura la clave pública de Turnstile para habilitar nuevos comentarios.</Text>}
          <Button type="submit" alignSelf="start" borderRadius="full" bg="app.text" color="app.canvas" loading={submitting} disabled={!turnstileSiteKey || !token}>Publicar comentario</Button>
          {message ? <Text role="status" color="app.muted">{message}</Text> : null}
        </Stack>
      </form>
      <Stack mt="10" gap="0" aria-busy={loading}>
        {loading ? <Text color="app.muted">Cargando comentarios…</Text> : null}
        {!loading && comments.length === 0 ? <Text color="app.muted">Todavía no hay comentarios. Puedes iniciar la conversación.</Text> : null}
        {comments.map((comment) => <Box key={comment.id} py="6" borderTopWidth="1px" borderColor="app.border"><HStack justify="space-between" align="start" gap="4"><Text fontWeight="700">{comment.name}</Text><Text color="app.muted" fontSize="sm">{new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeZone: "America/Lima" }).format(new Date(comment.createdAt))}</Text></HStack><Text mt="3" color="app.muted" whiteSpace="pre-wrap">{comment.message}</Text></Box>)}
      </Stack>
    </Box>
  );
}
