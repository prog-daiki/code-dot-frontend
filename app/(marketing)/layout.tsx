type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({
  children,
}: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
