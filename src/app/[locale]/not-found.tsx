import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-8xl font-black text-accent">404</span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-2 text-foreground-muted">
        A página que você procura não existe.
      </p>
      <div className="mt-8">
        <Button href="/pt/" variant="primary">
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
