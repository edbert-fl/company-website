export default function ProposalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </div>
    </div>
  );
}
