import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { login, signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await signUp(name, email, password);
      } else {
        await login(email, password);
      }

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Criar conta" : "Entrar"}
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {isRegister && (
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar"}
          </Button>
        </form>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-600 mt-4 w-full text-center"
        >
          {isRegister
            ? "Já tem conta? Fazer login"
            : "Não tem conta? Criar conta"}
        </button>
      </div>
    </div>
  );
}
