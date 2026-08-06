import { getUsers } from "@/lib/admin/users";
import { getAdminSession } from "@/lib/admin-auth";
import UsersTable from "./UsersTable";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.q ?? "";
  const page = Number(params.page ?? "1") || 1;
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.usersPage;

  const [result, session] = await Promise.all([
    getUsers({ search, page, pageSize: 20 }),
    getAdminSession(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{tp.title}</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        {tp.subtitle}
      </p>
      <UsersTable result={result} initialSearch={search} currentAdminId={session?.userId ?? ""} />
    </div>
  );
}
