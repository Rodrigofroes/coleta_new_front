import RegistroForm from "../forms/registroForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registroSchema } from "@/lib/schema/zod";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { ArrowLeft } from "lucide-react";
import AuthService from "@/lib/services/authService";
import { useToast } from "@/hooks/use-toast";

export default function Registro({ setRegistro }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(registroSchema),
    });

    const { toast } = useToast();


    const data = async (data) => {
        setLoading(true);
        const authService = new AuthService();
        const registro = await authService.Registro(data);
        if (!registro) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao cadastrar usuário",
                variant: "destructive"
            });
        }
        toast({
            title: "Sucesso",
            description: "Usuário cadastrado com sucesso",
        });
        reset();
        setLoading(false);
        setRegistro(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit(data)}>
                <CardContent className="mt-6">
                    <RegistroForm register={register} errors={errors} />
                    <Button type="submit" disabled={loading} className="w-full mt-4">
                        {loading ? <Spinner /> : "Cadastrar"}
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="line" className="text-primary" onClick={() => setRegistro(false)} >
                        <ArrowLeft size={16} /> Voltar
                    </Button>
                </CardFooter>
            </form>
        </>
    )
}