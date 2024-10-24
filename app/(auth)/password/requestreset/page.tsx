import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RequestPasswordReset from "@/components/auth/password/RequestPasswordReset";

export default async function RequestResetPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/account");
  return <RequestPasswordReset />;
}
