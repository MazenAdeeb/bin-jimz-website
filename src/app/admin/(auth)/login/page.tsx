import { signIn } from "@/lib/auth";
import { BrandMark } from "@/components/ui/brand-mark";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="grid min-h-screen place-items-center px-6 py-10">
      <div
        className="w-full max-w-md rounded-lg border p-8"
        style={{
          borderColor: "rgba(200,169,106,0.18)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <BrandMark size={36} />
        <h1 className="font-display mt-8 text-3xl">Admin sign in</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
          Bin Jimz internal access only.
        </p>

        {error && (
          <p className="mt-4 text-sm" style={{ color: "#ff8888" }}>
            Invalid credentials. Please try again.
          </p>
        )}

        <form
          action={async (fd) => {
            "use server";
            const email = String(fd.get("email") ?? "");
            const password = String(fd.get("password") ?? "");
            try {
              await signIn("credentials", {
                email,
                password,
                redirectTo: "/admin",
              });
            } catch (e) {
              const isRedirect =
                e instanceof Error && e.message?.includes("NEXT_REDIRECT");
              if (isRedirect) throw e;
              redirect(`/admin/login?error=invalid`);
            }
          }}
          className="mt-8 space-y-5"
        >
          <Field name="email" label="Email" type="email" required />
          <Field name="password" label="Password" type="password" required />
          <button
            type="submit"
            className="font-display mt-2 inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-[11px] tracking-[0.18em] uppercase text-[var(--color-base)]"
            style={{ background: "var(--color-gold)" }}
          >
            Sign in
          </button>
        </form>

        <p
          className="font-display mt-8 text-center text-[10px] tracking-[0.32em] uppercase"
          style={{ color: "var(--color-text-mute)" }}
        >
          binjimz.com
        </p>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="font-display text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}
