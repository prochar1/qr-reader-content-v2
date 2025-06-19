import { useState, useEffect } from "react";

type QrScannerProps = {
  onScan: (scannedId: string) => void;
  showDebug?: boolean;
};

export default function QrScanner({
  onScan,
  showDebug = false,
}: QrScannerProps) {
  const [qrBuffer, setQrBuffer] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Enter = konec QR kódu
        const scannedId = qrBuffer.trim();
        if (scannedId) {
          console.log("QR naskenován:", scannedId);
          onScan(scannedId);
        }
        setQrBuffer("");
      } else if (e.key.length === 1) {
        // Přidání znaku do bufferu
        setQrBuffer((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [qrBuffer, onScan]);

  // Debug zobrazení
  if (showDebug && qrBuffer) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          background: "#007acc",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: 5,
          fontSize: 12,
          fontFamily: "monospace",
          zIndex: 1000,
        }}
      >
        QR Buffer: {qrBuffer}
      </div>
    );
  }

  return null;
}
