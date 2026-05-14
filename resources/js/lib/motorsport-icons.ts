import type { LucideIcon } from 'lucide-react';
import {
    Activity,
    ArrowRight,
    Award,
    BadgeCheck,
    Calendar,
    Camera,
    ChevronRight,
    Circle,
    Clock,
    Cog,
    Cpu,
    Disc,
    Droplets,
    Eye,
    FileText,
    Flag,
    Gauge,
    Globe,
    Hammer,
    History,
    MapPin,
    Medal,
    Moon,
    Package,
    Scale,
    Settings,
    Ship,
    Sun,
    Target,
    Thermometer,
    Timer,
    TrendingUp,
    Trophy,
    Truck,
    Users,
    Wind,
    Wrench,
    Zap,
} from 'lucide-react';

/**
 * Maps CMS / API icon name strings to Lucide components used across motorsport pages.
 */
const MOTORSPORT_LUCIDE_ICONS: Record<string, LucideIcon> = {
    Activity,
    ArrowRight,
    Award,
    BadgeCheck,
    Calendar,
    Camera,
    ChevronRight,
    Circle,
    Clock,
    Cog,
    Cpu,
    Disc,
    Droplets,
    Eye,
    FileText,
    Flag,
    Gauge,
    Globe,
    Hammer,
    History,
    MapPin,
    Medal,
    Moon,
    Package,
    Scale,
    Settings,
    Ship,
    Sun,
    Target,
    Thermometer,
    Timer,
    TrendingUp,
    Trophy,
    Truck,
    Users,
    Wind,
    Wrench,
    Zap,
};

/**
 * Resolves a stored icon key to a Lucide icon component.
 */
export function motorsportLucideIcon(key: string | undefined | null): LucideIcon {
    if (! key) {
        return Circle;
    }

    return MOTORSPORT_LUCIDE_ICONS[key] ?? Circle;
}
