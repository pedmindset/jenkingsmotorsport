import type { LucideIcon } from 'lucide-react';

/**
 * Shared motorsport / CMS-related prop shapes for Inertia pages.
 */

/**
 * Single destination in the public site header/footer navigation.
 */
export type NavLinkLeaf = {
    name: string;
    href: string;
    external: boolean;
};

/**
 * Grouped submenu (desktop dropdown / mobile collapsible).
 */
export type NavLinkGroup = {
    label: string;
    items: NavLinkLeaf[];
};

export type NavLinkEntry = NavLinkLeaf | NavLinkGroup;

export type SiteContactEmail = {
    label: string;
    address: string;
};

export type SiteContact = {
    address_lines?: string[];
    emails?: SiteContactEmail[];
    phone_e164?: string;
    phone_display?: string;
    press_blurb?: string;
};

export type SiteSocial = {
    facebook?: string;
    instagram?: string;
};

export type SiteFooterCredit = {
    label?: string;
    url?: string;
};

export type SiteSettings = {
    nav_links?: NavLinkEntry[];
    social?: SiteSocial;
    contact?: SiteContact;
    'footer.developer_credit'?: SiteFooterCredit;
    [key: string]: unknown;
};

export type SeasonObjective = {
    title: string;
    description: string;
    icon: string;
};

export type SeasonBanner = {
    eyebrow?: string;
    title?: string;
    body?: string;
};

export type SeasonPageSeason = {
    slug: string;
    year: number;
    title: string;
    objectives?: SeasonObjective[];
    previousSeasonBanner?: SeasonBanner | null;
};

export type SeasonRaceRow = {
    event: string;
    title: string;
    date: string;
    startsAt: string;
    venue: string;
    country: string;
    rounds: string;
    description: string;
    highlight?: string | null;
    isInternational?: boolean;
    link?: string | null;
};

export type StandingRow = {
    rank: number;
    name: string;
    truck: string;
    points: number;
    isJenkins?: boolean;
    racingNumber?: string | null;
    profileImage?: string | null;
};

export type SeasonStandingTablePayload = {
    divisionLabel: string;
    standings: StandingRow[];
    standingStatus: string;
};

export type RoundResultRow = {
    driverName: string;
    truck: string;
    position: number | null;
    points: number;
    status: string | null;
    division: string;
    racingNumber?: string | null;
    isJenkins?: boolean;
    profileImage?: string | null;
};

export type RoundResultsRoundPayload = {
    event: string;
    title: string;
    dateDisplay: string;
    venue: string;
    results: RoundResultRow[];
};

export type StandingSeasonPayload = {
    year: string;
    divisionLabel: string;
    standings: StandingRow[];
    standingStatus: string;
    isActive?: boolean;
};

export type CareerResultRow = {
    year: number;
    result: string;
    division: string;
    highlight: boolean;
};

export type ContenderRow = {
    name: string;
    title: string;
    threat: string;
    profileImage?: string | null;
};

export type TechnicalPartnerCard = {
    name: string;
    role: string;
    description: string;
    technicalFact: string;
    icon: string;
    theme: {
        glow: string;
        iconBg: string;
        iconText: string;
        bar: string;
    };
    image: string | null;
    link: string | null;
};

export type PartnershipTierCard = {
    name: string;
    impact: string;
    benefits: string[];
    cta: string | null;
    link: string | null;
    highlight: boolean;
};

export type GalleryImageTag = {
    slug: string;
    name: string;
};

export type GallerySeasonRef = {
    slug: string;
    year: number;
    title: string;
};

export type GalleryDateParts = {
    day: string;
    month: string;
    year: string;
};

export type GalleryImageRow = {
    id: number;
    slug: string | null;
    src: string;
    alt: string;
    title: string;
    caption: string | null;
    category: string;
    featured: boolean;
    takenAt: string | null;
    dateLabel: string | null;
    dateParts: GalleryDateParts | null;
    season: GallerySeasonRef | null;
    tags: GalleryImageTag[];
};

export type VehiclePayload = {
    name: string;
    racingNumber: string;
    heroImagePath: string | null;
    description: string | null;
} | null;

export type VehicleSpecRow = {
    label: string;
    value: string;
    iconKey: string | null;
};

export type LegacyTimelineSection = {
    year: string;
    title: string;
    subTitle: string;
    image: string;
    filterClass: string;
    themeColor: string;
    align?: string;
    paragraphs?: string[];
    listItems?: Array<{ icon: string; content: string }>;
    callout?: { title: string; body: string };
    badge?: string;
    stats?: Array<{ value: string; label: string }>;
};

export type LegacyContent = {
    timeline?: { sections: LegacyTimelineSection[] };
    fact_check_rows?: {
        rows: Array<{ info: string; status: string; detail: string }>;
    };
};

export type LeMansJourneyLocation = {
    id: string;
    name: string;
    city: string;
    icon: string;
    color: string;
    position: number;
    tasks: string[];
    description: string;
};

export type LeMansLocationRuntime = LeMansJourneyLocation & { iconComponent: LucideIcon };

export type LeMansContent = {
    journey_locations?: { locations: LeMansJourneyLocation[] };
    circuit_features?: { items: Array<{ name: string; description: string }> };
    technical_focus?: {
        items: Array<{ icon: string; title: string; description: string; color: string }>;
    };
    event_schema?: Record<string, unknown>;
};

export type HeadlineStat = {
    value: string;
    unit: string;
    label: string;
};
