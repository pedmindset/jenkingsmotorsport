import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/favicon.png"
            alt="Jenkins Logo"
            className={props.className}
            style={{ objectFit: 'contain' }}
        />
    );
}
