export default function Page({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  return (
    <pre>
      <code>{JSON.stringify(params, null, 2)}</code>
    </pre>
  );
}
