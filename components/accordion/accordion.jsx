import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";

function AccordionWithTables({ data, editarTalhao, deletarTalhao, visualizar, isVisualizarMapa = false }) {
    const isListValid = Array.isArray(data) && data.length > 0;

    return (
        <div>
            {isListValid ? (
                data.map((row, rowIndex) => (
                    <Accordion key={rowIndex} type="single" collapsible>
                        <AccordionItem value={`row-${rowIndex}`} className="mb-2">
                            <div className="flex items-center justify-between w-full p-4 bg-gray-200 rounded-lg">
                                <AccordionTrigger className="flex-1 text-left">
                                    <p className="font-bold">{row.fazenda.nome}</p>
                                </AccordionTrigger>
                                {!isVisualizarMapa && (
                                    <div className="flex justify-center gap-3">
                                        <Button size="sm" onClick={(event) => {
                                            event.stopPropagation();
                                            editarTalhao(row.id);
                                        }}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>


                                        <Button size="sm" onClick={(event) => {
                                            event.stopPropagation();
                                            deletarTalhao(row.id);
                                        }}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <AccordionContent>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    {/* Tabela de Talhões */}
                                    <Table className="w-full border-spacing-y-2">
                                        <TableHeader>
                                            <TableRow>
                                                <TableCell className="px-4 py-2 font-bold text-center align-middle">Nome</TableCell>
                                                <TableCell className="px-4 py-2 font-bold text-center align-middle">Área</TableCell>
                                                <TableCell className="px-4 py-2 font-bold text-center align-middle">Observação</TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {row.talhoes.map((talhao, index) => (
                                                <TableRow key={index} className="text-center">
                                                    <TableCell className="px-4 py-2">{talhao.nome}</TableCell>
                                                    <TableCell className="px-4 py-2">{talhao.area} ha</TableCell>
                                                    <TableCell className="px-4 py-2">{talhao.observacao || 'N/A'}</TableCell>
                                                    <TableCell className="px-4 py-2">
                                                        {isVisualizarMapa && (
                                                            <div className="flex justify-center gap-3">
                                                                <Button size="sm" onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    visualizar(talhao.id);
                                                                }}>
                                                                    <EyeIcon className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))
            ) : (
                <p className="text-center py-4 text-gray-500">Nenhum dado disponível</p>
            )}
        </div>
    );
}

export default AccordionWithTables;
