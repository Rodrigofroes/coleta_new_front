"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schema/zod";
import { Spinner } from "@/components/ui/spinner";
import AuthService from "@/lib/services/authService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Registro from "@/components/registro/registro";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [registro, setRegistro] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const data = async (data) => {
    setLoading(true);
    const authService = new AuthService();
    const response = await authService.Login(data);
    if (!response) {
      setLoading(false);
      return toast({
        title: "Erro",
        description: "E-mail ou senha inválidos",
        variant: "destructive"
      });
    }
    document.cookie = `token=${response.token}`;
    toast({
      title: "Sucesso",
      description: "Usuário autenticado com sucesso",
    });
    setLoading(false);
    router.push("/admin");
  }

  const handleRegistro = () => {
    setRegistro(true);
  }


  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </CardHeader>
        <CardTitle className="flex justify-center items-center">
          <h2 className=" text-3xl font-extrabold text-gray-900">AgroSystem</h2>
        </CardTitle>
        <CardDescription className="flex justify-center items-center">
          <p className="mt-2 text-sm text-gray-600">
            {registro ? "Preencha seus dados para criar um conta" : "Entre com suas credenciais para acessar o sistema"}
          </p>
        </CardDescription>
        {registro ? (
          <Registro setRegistro={setRegistro} />
        ) : (
          <>
            <CardContent className="mt-6">
              <form onSubmit={handleSubmit(data)} className="space-y-4">
                <div>
                  <div>
                    <Label>E-mail</Label>
                    <Input
                      className="mt-1 block w-full px-3 py-2"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                    />
                    {errors.email && (<p className="text-red-500 text-sm">*{errors.email.message}</p>)}
                  </div>
                  <div>
                    <Label>Senha</Label>
                    <Input
                      className="mt-1 block w-full px-3 py-2"
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    {errors.password && (<p className="text-red-500 text-sm">*{errors.password.message}</p>)}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">Lembrar-me</Label>
                  </div>
                  <a href="#" className="text-sm text-primary">Esqueceu sua senha?</a>
                </div>
                <div>
                  <Button type="submit" disabled={loading} className="mt-4 w-full">
                    {loading ? <Spinner size="small" /> : "Entrar"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="mt-4 text-sm text-gray-600">
                Não tem uma conta? <Button variant="line" onClick={handleRegistro} className="text-primary">Registre-se</Button>
              </p>
            </CardFooter>
          </>
        )}
      </div>
    </div >
  );
}
