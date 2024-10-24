import Providers from "@/components/Providers";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Providers>{children}</Providers>
    </div>
  );
}
