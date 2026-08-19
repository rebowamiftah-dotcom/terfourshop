// import CustomerHeader from "@/components/Header/CustomerHeader";

export default function CustomerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-[100dvh] flex flex-col">
      {/* <CustomerHeader /> */}

      <main className="flex-1">
        {children}
      </main>
    </main>
  );
}