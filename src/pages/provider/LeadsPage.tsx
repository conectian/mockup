import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MoreHorizontal,
    Building2,
    Download,
    Plus,
    Clock,
    DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

const COLUMNS = [
    { id: 'nuevo', title: 'Nuevo Lead', color: 'bg-blue-500' },
    { id: 'contactado', title: 'Contactado', color: 'bg-amber-500' },
    { id: 'cualificado', title: 'Cualificado', color: 'bg-emerald-500' },
    { id: 'propuesta', title: 'Propuesta', color: 'bg-violet-500' }
];

const INITIAL_DATA = {
    nuevo: [
        {
            id: '1',
            company: 'InnovateCorp',
            contact: 'Ana García',
            value: '15,000',
            date: 'hace 2h',
            interest: 'IA para Logística'
        },
        {
            id: '5',
            company: 'RetailFlow',
            contact: 'Pedro Luna',
            value: '8,400',
            date: 'hace 5h',
            interest: 'POS System'
        },
    ],
    contactado: [
        {
            id: '2',
            company: 'NextGen Solutions',
            contact: 'Carlos Ruiz',
            value: '28,500',
            date: 'ayer',
            interest: 'Blockchain Backend'
        },
    ],
    cualificado: [
        {
            id: '3',
            company: 'MegaRetail SA',
            contact: 'Elena Pons',
            value: '42,000',
            date: 'hace 3 días',
            interest: 'E-commerce API'
        },
    ],
    propuesta: [
        {
            id: '4',
            company: 'TechFlow',
            contact: 'Marc Soler',
            value: '12,000',
            date: 'hace 1 semana',
            interest: 'Cloud Migration'
        }
    ]
};

export default function LeadsPage() {
    const [data, setData] = useState(INITIAL_DATA);

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceCol = source.droppableId as keyof typeof INITIAL_DATA;
        const destCol = destination.droppableId as keyof typeof INITIAL_DATA;

        const sourceItems = [...data[sourceCol]];
        const [removed] = sourceItems.splice(source.index, 1);

        if (sourceCol === destCol) {
            sourceItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                [sourceCol]: sourceItems,
            });
        } else {
            const destItems = [...data[destCol]];
            destItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                [sourceCol]: sourceItems,
                [destCol]: destItems,
            });
        }
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Pipeline de Leads</h1>
                    <p className="text-muted-foreground mt-1">Arrastra y gestiona tus oportunidades de negocio</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" /> Exportar
                    </Button>
                    <Button size="sm" className="premium-gradient gap-2">
                        <Plus className="h-4 w-4" /> Nuevo Lead
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex-1 flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
                    {COLUMNS.map((column) => (
                        <div key={column.id} className="flex-1 min-w-[300px] flex flex-col gap-4">
                            {/* Column Header */}
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <div className={cn("h-2 w-2 rounded-full", column.color)} />
                                    <h3 className="font-bold text-foreground dark:text-white uppercase tracking-wider text-xs">
                                        {column.title}
                                    </h3>
                                    <Badge variant="secondary" className="bg-white/10 text-[10px] h-5 px-1.5">
                                        {data[column.id as keyof typeof INITIAL_DATA].length}
                                    </Badge>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Column Content */}
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={cn(
                                            "flex-1 bg-slate-100/40 dark:bg-white/5 rounded-xl p-3 space-y-3 border border-dashed transition-colors",
                                            snapshot.isDraggingOver ? "border-primary/50 bg-primary/5" : "border-slate-200 dark:border-white/5"
                                        )}
                                    >
                                        {data[column.id as keyof typeof INITIAL_DATA].map((lead, index) => (
                                            <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card className={cn(
                                                            "py-0 glass-card border-white/20 transition-all group overflow-hidden",
                                                            snapshot.isDragging ? "shadow-2xl ring-2 ring-primary/20 scale-[1.02] cursor-grabbing" : "cursor-grab"
                                                        )}>
                                                            {/* Spark line top */}
                                                            <div className={cn("h-1 w-full", column.color)} />
                                                            <CardContent className="p-4 space-y-3">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <div className="font-bold text-foreground dark:text-white group-hover:text-primary transition-colors">
                                                                            {lead.company}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                                            <Building2 className="h-3 w-3" /> {lead.contact}
                                                                        </div>
                                                                    </div>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <MoreHorizontal className="h-3 w-3" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end" className="glass-card">
                                                                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                                                            <DropdownMenuItem>Mover a...</DropdownMenuItem>
                                                                            <DropdownMenuItem className="text-destructive">Archivar</DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </div>

                                                                <div className="flex flex-wrap gap-1.5">
                                                                    <Badge variant="outline" className="bg-white/50 dark:bg-white/5 text-[10px] font-medium border-slate-200 dark:border-white/10">
                                                                        {lead.interest}
                                                                    </Badge>
                                                                </div>

                                                                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                                                        <DollarSign className="h-3 w-3" />
                                                                        {lead.value}
                                                                    </div>
                                                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                                                        <Clock className="h-3 w-3" />
                                                                        {lead.date}
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                        {!snapshot.isDraggingOver && (
                                            <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-primary transition-colors border border-dashed border-transparent hover:border-primary/20">
                                                <Plus className="h-4 w-4" />
                                                <span className="text-sm">Añadir lead</span>
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
