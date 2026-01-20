import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full text-muted-foreground hover:text-foreground hover:bg-accent"
        >
            {theme === 'light' ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
