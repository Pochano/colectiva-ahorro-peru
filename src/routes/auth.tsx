import { Link, createFileRoute } from "@tanstack/react-router";
import { Store, Users } from "lucide-react";
import { useState } from "react";

import { PrimaryButton } from "@/components/ui-bits";
import { cn } from "@/lib/utils";
import logoMayora from "@/assets/logo-mayora.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Ingresar o registrarse — Mayora" },
      {
        name: "description",
        content: "Accede como MYPE compradora o como proveedor mayorista en Mayora.",
      },
      { property: "og:title", content: "Ingresar o registrarse — Mayora" },
      { property: "og:description", content: "Acceso para MYPE compradoras y proveedores." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "registro">("login");
  const [role, setRole] = useState<"mype" | "proveedor">("mype");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <Link to="/" className="mb-6 flex items-center gap-2">
        <img src={logoMayora} alt="Mayora" className="size-11 rounded-2xl object-contain" />
        <span className="text-2xl font-extrabold">Mayora</span>
      </Link>

      <div className="card-surface w-full max-w-md p-5">
        <div className="grid grid-cols-2 gap-1 rounded-full bg-secondary p-1">
          {(["login", "registro"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-full py-2 text-sm font-bold capitalize",
                mode === m ? "bg-card text-primary shadow-[var(--shadow-card)]" : "text-muted-foreground",
              )}
            >
              {m === "login" ? "Iniciar sesión" : "Registrarme"}
            </button>
          ))}
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Tipo de cuenta
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => setRole("mype")}
            className={cn(
              "rounded-2xl border p-3 text-left",
              role === "mype" ? "border-primary bg-primary-soft" : "border-border bg-card",
            )}
          >
            <Users className="size-5 text-primary" />
            <p className="mt-2 text-sm font-bold">MYPE compradora</p>
            <p className="text-xs text-muted-foreground">Panadería, café, restaurante</p>
          </button>
          <button
            onClick={() => setRole("proveedor")}
            className={cn(
              "rounded-2xl border p-3 text-left",
              role === "proveedor" ? "border-primary bg-primary-soft" : "border-border bg-card",
            )}
          >
            <Store className="size-5 text-trust" />
            <p className="mt-2 text-sm font-bold">Proveedor</p>
            <p className="text-xs text-muted-foreground">Distribuidor mayorista</p>
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {mode === "registro" && (
            <Field
              label={role === "mype" ? "Nombre del negocio" : "Razón social"}
              placeholder={role === "mype" ? "Pastelería Dulce Sur" : "Distribuidora Andina"}
            />
          )}
          {mode === "registro" && <Field label="RUC" placeholder="20456789012" />}
          <Field label="Correo" placeholder="contacto@dulcesur.pe" type="email" />
          <Field label="Contraseña" placeholder="••••••••" type="password" />
          {mode === "registro" && <Field label="Distrito" placeholder="Yanahuara, Arequipa" />}
        </div>

        <Link
          to={role === "mype" ? "/dashboard" : "/proveedor"}
          className="mt-6 block"
        >
          <PrimaryButton>
            {mode === "login" ? "Ingresar" : "Crear cuenta"}
          </PrimaryButton>
        </Link>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Demo visual — cualquier dato te deja entrar.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
