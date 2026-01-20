import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { type LucideIcon, ChevronRight } from 'lucide-react';

export interface SubItem {
    name: string;
    value: string; // The query param value (e.g., 'empresas')
    icon: LucideIcon;
    description?: string;
    href?: string; // Optional direct link
}

export interface NavItem {
    name: string;
    basePath: string; // e.g., '/provider/marketplace'
    icon: LucideIcon;
    subItems: SubItem[];
}

interface ExpandingNavProps {
    items: NavItem[];
}

export function ExpandingNav({ items }: ExpandingNavProps) {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Determine active section based on URL
    useEffect(() => {
        const currentPath = location.pathname;
        // Find the item that matches the current path
        // We sort by length descending to match the most specific path first
        const found = [...items]
            .sort((a, b) => b.basePath.length - a.basePath.length)
            .find(item => {
                // Check if any sub-item href matches
                const hasMatchingSubItem = item.subItems.some(sub => 
                    sub.href && currentPath.startsWith(sub.href)
                );
                if (hasMatchingSubItem) return true;
                
                return currentPath.startsWith(item.basePath);
            });

        if (found) {
            setActiveSection(found.name);
        } else {
            setActiveSection(null);
        }
    }, [location.pathname, items]);

    const handleSectionClick = (itemName: string) => {
        setActiveSection(itemName === activeSection ? null : itemName);
    };

    return (
        <div className="flex items-center gap-2">
            {items.map((item) => {
                const isActive = activeSection === item.name;
                const currentTab = searchParams.get('tab');
                
                return (
                    <div 
                        key={item.name}
                        className={cn(
                            "group flex items-center transition-all duration-300 ease-in-out border rounded-full overflow-hidden",
                            isActive 
                                ? "bg-white/10 border-white/10 pr-1" 
                                : "bg-transparent border-transparent hover:bg-white/5"
                        )}
                    >
                        {/* Main Section Button */}
                        <button
                            onClick={() => handleSectionClick(item.name)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                                isActive ? "text-white" : "text-white/70 group-hover:text-white"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                            {!isActive && (
                                <ChevronRight className="h-3 w-3 opacity-0 -ml-2 group-hover:opacity-50 group-hover:ml-0 transition-all duration-300" />
                            )}
                        </button>

                        {/* Expanded Sub-items */}
                        <div 
                            className={cn(
                                "flex items-center gap-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                                isActive ? "max-w-[500px] opacity-100" : "max-w-0 opacity-0"
                            )}
                        >
                            <div className="w-px h-4 bg-white/10 mx-1 shrink-0" />
                            
                            {item.subItems.map((subItem) => {
                                const isSubActive = subItem.href 
                                    ? location.pathname.startsWith(subItem.href)
                                    : currentTab === subItem.value;

                                return (
                                    <Link
                                        key={subItem.value}
                                        to={subItem.href || `${item.basePath}?tab=${subItem.value}`}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                                            isSubActive 
                                                ? "bg-white/20 text-white shadow-sm hover:bg-white/25" 
                                                : "text-white/60 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <subItem.icon className={cn("h-3.5 w-3.5", isSubActive ? "text-white" : "opacity-70")} />
                                        {subItem.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
