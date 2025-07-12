'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RequireAuth({ children }) {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true); // ✅ ensure DOM is ready

        const publicPaths = ['/login', '/register'];
        const token = localStorage.getItem('token');
        const isPublic = publicPaths.includes(pathname);

        if (!token && !isPublic) {
            router.push('/login');
        }
    }, [pathname]);

    // ✅ Avoid mismatch by rendering nothing until client loads
    if (!isMounted) return (<div>Loading...</div>);

    return <>{children}</>;
}
