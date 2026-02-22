import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("enviamos um link de autenticação para seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    } catch {
      toast.error("Credenciais inválidas.");
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
