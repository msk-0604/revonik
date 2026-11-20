/** 構造化データ（JSON-LD）。< をエスケープしてスクリプトの途中終了を防ぐ */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
