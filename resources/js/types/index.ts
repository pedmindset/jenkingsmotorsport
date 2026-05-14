export type * from './auth';
export type * from './motorsport';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';
import type { SiteSettings } from './motorsport';

export type SharedData = {
    name: string;
    appUrl: string;
    auth: Auth;
    sidebarOpen: boolean;
    site: SiteSettings;
    meta: {
        title?: string;
        description?: string;
        image?: string;
        url?: string;
        type?: string;
    };
    [key: string]: unknown;
};
