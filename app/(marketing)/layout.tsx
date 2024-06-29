type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({
  children,
}: Props) {
  return (
    <>
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </>
  );
}
