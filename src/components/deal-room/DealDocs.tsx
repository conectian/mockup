import { useDealStore } from '@/store/useDealStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    FileText,
    Download,
    Eye,
    CheckCircle2,
    Clock,
    FileSignature,
    Shield,
    File
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const typeIcons = {
    propuesta: FileText,
    contrato: FileSignature,
    nda: Shield,
    otro: File,
};

const typeLabels = {
    propuesta: 'Propuesta',
    contrato: 'Contrato',
    nda: 'NDA',
    otro: 'Documento',
};

export default function DealDocs() {
    const { documents, approveDocument } = useDealStore();

    const handleApprove = (docId: string, docName: string) => {
        approveDocument(docId);
        toast.success(`Documento aprobado`, {
            description: `Has aprobado "${docName}"`,
        });
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h2 className="text-lg md:text-xl font-bold">Documentos</h2>
                <p className="text-sm md:text-base text-muted-foreground">Archivos compartidos y control de versiones</p>
            </div>

            <div className="grid gap-4">
                {documents.map((doc) => {
                    const Icon = typeIcons[doc.type];

                    return (
                        <Card
                            key={doc.id}
                            className={cn(
                                'transition-all',
                                doc.approved && 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20'
                            )}
                        >
                            <CardContent className="p-3 md:p-4">
                                {/* Mobile Layout */}
                                <div className="md:hidden space-y-3">
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div
                                            className={cn(
                                                'h-10 w-10 rounded-md flex items-center justify-center shrink-0',
                                                doc.approved
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/50'
                                                    : 'bg-muted'
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    'h-5 w-5',
                                                    doc.approved ? 'text-emerald-600' : 'text-muted-foreground'
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-medium text-sm truncate">{doc.name}</span>
                                                <Badge variant="outline" className="text-[10px] shrink-0">
                                                    v{doc.version}
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {typeLabels[doc.type]} • {doc.uploadedBy === 'provider' ? 'Proveedor' : 'Cliente'}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {doc.uploadedAt}
                                            </div>
                                        </div>
                                        {/* Status Badge */}
                                        {doc.approved ? (
                                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 gap-1 text-[10px] shrink-0">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Aprobado
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="gap-1 text-[10px] shrink-0">
                                                <Clock className="h-3 w-3" />
                                                Pendiente
                                            </Badge>
                                        )}
                                    </div>
                                    {/* Mobile Actions */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                        <Button variant="ghost" size="sm" className="flex-1 gap-1 h-9 text-xs">
                                            <Eye className="h-3.5 w-3.5" />
                                            Ver
                                        </Button>
                                        <Button variant="ghost" size="sm" className="flex-1 gap-1 h-9 text-xs">
                                            <Download className="h-3.5 w-3.5" />
                                            Descargar
                                        </Button>
                                        {!doc.approved && (
                                            <Button
                                                size="sm"
                                                className="flex-1 gap-1 h-9 text-xs bg-emerald-600 hover:bg-emerald-700"
                                                onClick={() => handleApprove(doc.id, doc.name)}
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                Aprobar
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop Layout */}
                                <div className="hidden md:flex items-center gap-4">
                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            'h-12 w-12 rounded-md flex items-center justify-center shrink-0',
                                            doc.approved
                                                ? 'bg-emerald-100 dark:bg-emerald-900/50'
                                                : 'bg-muted'
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                'h-6 w-6',
                                                doc.approved ? 'text-emerald-600' : 'text-muted-foreground'
                                            )}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium truncate">{doc.name}</span>
                                            <Badge variant="outline" className="text-xs shrink-0">
                                                v{doc.version}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                            <span>{typeLabels[doc.type]}</span>
                                            <span>•</span>
                                            <span>Subido por {doc.uploadedBy === 'provider' ? 'Proveedor' : 'Cliente'}</span>
                                            <span>•</span>
                                            <span>{doc.uploadedAt}</span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    {doc.approved ? (
                                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 gap-1">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Aprobado
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="gap-1">
                                            <Clock className="h-3 w-3" />
                                            Pendiente
                                        </Badge>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Eye className="h-4 w-4" />
                                            Ver
                                        </Button>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Download className="h-4 w-4" />
                                            Descargar
                                        </Button>
                                        {!doc.approved && (
                                            <Button
                                                size="sm"
                                                className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                                                onClick={() => handleApprove(doc.id, doc.name)}
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Aprobar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Upload Section */}
            <Card className="border-dashed border-2">
                <CardContent className="py-6 md:py-8 text-center">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3 md:mb-4">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                        Arrastra archivos aquí o haz clic para subir
                    </p>
                    <Button variant="outline" className="text-sm">Subir Documento</Button>
                </CardContent>
            </Card>
        </div>
    );
}
