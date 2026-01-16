import * as React from "react"
import { Check, ChevronDown, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface MultiSelectProps {
    options: string[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Seleccionar...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase())
    )

    const handleUnselect = (item: string) => {
        onChange(selected.filter((s) => s !== item))
    }

    const handleToggle = (item: string) => {
        if (selected.includes(item)) {
            onChange(selected.filter((s) => s !== item))
        } else {
            onChange([...selected, item])
        }
        // Optional: Keep open for multiple selections
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between bg-muted/30 border-white/10 hover:bg-muted/50 text-left font-normal py-2 px-3",
                        selected.length > 0 && "h-auto min-h-[36px]",
                        className
                    )}
                >
                    <div className="flex gap-1 flex-wrap">
                        {selected.length === 0 ? (
                            <span className="text-muted-foreground text-sm">{placeholder}</span>
                        ) : (
                            selected.map((item) => (
                                <Badge
                                    variant="secondary"
                                    key={item}
                                    className="mr-1 mb-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleUnselect(item)
                                    }}
                                >
                                    {item}
                                    <X className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" />
                                </Badge>
                            ))
                        )}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-2 glass-card border-white/10" align="start">
                <div className="flex items-center border-b border-white/10 px-1 pb-2 mb-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                        placeholder="Buscar..."
                        className="h-8 border-none bg-transparent focus-visible:ring-0 px-0 placeholder:text-muted-foreground"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {filteredOptions.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-2">No se encontraron resultados.</p>
                    )}
                    {filteredOptions.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleToggle(option)}
                            className={cn(
                                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted focus:bg-accent focus:text-accent-foreground",
                                selected.includes(option) ? "bg-primary/10 text-primary" : "text-foreground"
                            )}
                        >
                            <div
                                className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    selected.includes(option)
                                        ? "bg-primary text-primary-foreground"
                                        : "opacity-50 border-muted-foreground"
                                )}
                            >
                                {selected.includes(option) && <Check className="h-3 w-3" />}
                            </div>
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
