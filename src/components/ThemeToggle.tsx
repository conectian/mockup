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
            className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
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
