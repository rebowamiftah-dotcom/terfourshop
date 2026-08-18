export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-[100dvh]">
      {children}
    </main>
  );
}