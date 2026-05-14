import type { NavLinkEntry, NavLinkGroup, NavLinkLeaf } from '@/types/motorsport';

/**
 * Determines whether a navigation entry is a grouped submenu.
 */
export function isNavLinkGroup(entry: NavLinkEntry): entry is NavLinkGroup {
    return (
        typeof entry === 'object' &&
        entry !== null &&
        'items' in entry &&
        Array.isArray((entry as NavLinkGroup).items) &&
        typeof (entry as NavLinkGroup).label === 'string'
    );
}

/**
 * Flattens grouped navigation into individual links (e.g. footer shop lookup).
 *
 * @return list of leaf links in visual order
 */
export function flattenNavLeaves(entries: NavLinkEntry[]): NavLinkLeaf[] {
    const out: NavLinkLeaf[] = [];

    for (const entry of entries) {
        if (isNavLinkGroup(entry)) {
            out.push(...entry.items);
        } else {
            out.push(entry);
        }
    }

    return out;
}

/**
 * Normalizes CMS `nav_links` JSON: supports legacy flat arrays and newer grouped entries.
 */
export function normalizeNavEntries(raw: unknown, fallback: NavLinkEntry[]): NavLinkEntry[] {
    if (!Array.isArray(raw) || raw.length === 0) {
        return fallback;
    }

    const sanitized: NavLinkEntry[] = [];

    for (const item of raw) {
        if (!item || typeof item !== 'object') {
            continue;
        }

        if (isNavLinkGroup(item as NavLinkEntry)) {
            const group = item as NavLinkGroup;
            const items = group.items
                .filter(
                    (leaf) =>
                        Boolean(leaf) &&
                        typeof leaf === 'object' &&
                        typeof (leaf as NavLinkLeaf).name === 'string' &&
                        typeof (leaf as NavLinkLeaf).href === 'string',
                )
                .map((leaf) => ({
                    name: (leaf as NavLinkLeaf).name,
                    href: (leaf as NavLinkLeaf).href,
                    external: Boolean((leaf as NavLinkLeaf).external),
                }));
            if (items.length > 0) {
                sanitized.push({
                    label: group.label,
                    items,
                });
            }

            continue;
        }

        const leaf = item as Partial<NavLinkLeaf>;
        if (typeof leaf.name === 'string' && typeof leaf.href === 'string') {
            sanitized.push({
                name: leaf.name,
                href: leaf.href,
                external: Boolean(leaf.external),
            });
        }
    }

    return sanitized.length > 0 ? sanitized : fallback;
}
