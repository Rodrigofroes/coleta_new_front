import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Map, UserCircle, Users, Wheat } from "lucide-react";

const stats = [
    { name: "Clientes", value: "12", icon: Users },
    { name: "Fazendas", value: "24", icon: Building2 },
    { name: "Safras Ativas", value: "8", icon: Wheat },
    { name: "Talhões", value: "148", icon: Map },
    { name: "Funcionários", value: "32", icon: UserCircle },
];



export default function Admin() {



    
    return (
        <div className="container justify-center items-center">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Painel de controle do sistema
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card key={item.name} className="flex items-center p-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-100 rounded-md">
                                    <Icon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{item.name}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Atividades Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">Nenhuma atividade recente para exibir.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Próximas Colheitas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">Nenhuma colheita programada.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
