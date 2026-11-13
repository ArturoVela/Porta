import { QrCode } from "@chakra-ui/react";

export default function WalletQr({ url, name }: { url: string; name: string }) {
  return (
    <QrCode.Root value={url} encoding={{ ecc: "M", border: 4 }} size="lg">
      <QrCode.Frame role="img" aria-label={`Código QR para visitar ${name}`} />
    </QrCode.Root>
  );
}
