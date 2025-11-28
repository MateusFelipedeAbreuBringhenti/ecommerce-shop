import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignIn } from "../hooks/use-signin";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Beef } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .nonempty("O e-mail é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
});

export type LoginSchema = z.infer<typeof formSchema>;

export function SignInForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectURL = searchParams.get("redirect") || "/";

  const { mutate, isPending, error } = useSignIn();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(values: LoginSchema) {
    mutate(values, {
      onSuccess: () => navigate(redirectURL)
    });
  }

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4 bg-[#1A1A1A]">
      <Card className="w-full max-w-md shadow-xl border border-zinc-700 bg-[#262626]">
        
        <CardHeader className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Beef className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-zinc-100">
              MeatHouse Shop
            </h1>
          </div>

          <p className="text-sm text-zinc-500">
            Faça login para continuar
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-3">
              <AlertDescription className="text-red-700">
                {(error as any).response?.data?.message ||
                  "Erro ao realizar login"}
              </AlertDescription>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        {...field}
                        className="bg-zinc-800 text-zinc-100 border-zinc-600 placeholder:text-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="bg-zinc-800 text-zinc-100 border-zinc-600 placeholder:text-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-zinc-100"
                disabled={isPending}
              >
                {isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>

          <Separator className="my-6" />

          <div className="text-center">
            <h2 className="text-lg font-semibold text-zinc-100 mb-1">
              Crie uma conta
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Ainda não tem uma conta MeatHouse Shop?
            </p>

            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
              onClick={() => navigate("/signup")}
            >
              Cadastre-se
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
