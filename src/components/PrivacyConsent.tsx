import { Box, Stack, Text } from "@chakra-ui/react";
import { ContentLink } from "@/components/ContentLink";
import { useContent } from "@/content/context";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal";

export function PrivacyConsent({ comments = false }: { comments?: boolean }) {
  const { copy } = useContent();
  return (
    <Stack gap="2" fontSize="sm">
      <Text color="app.muted">{comments ? copy.legal.commentNotice : copy.legal.contactNotice}</Text>
      <ContentLink to="/legal#privacidad" target="_blank" rel="noopener noreferrer" className="privacy-policy-link">{copy.legal.privacyLink}</ContentLink>
      <Box as="label" display="flex" alignItems="start" gap="3" py="2" minH="11" cursor="pointer">
        <input className="privacy-consent" type="checkbox" name="privacyConsent" value={PRIVACY_POLICY_VERSION} required />
        <span>{copy.legal.consent}</span>
      </Box>
    </Stack>
  );
}
