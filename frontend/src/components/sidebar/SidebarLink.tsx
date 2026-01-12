import {
    Link,
    type Path,
    type PathMatch,
    useMatch,
    useResolvedPath,
} from 'react-router';
import React from 'react';
import { cn } from '../../utils/util.ts';

interface SidebarLinkProps {
    path: string;
    children: React.ReactNode;
}

const SidebarLink = ({ path, children }: SidebarLinkProps) => {
    const currentPath: Path = useResolvedPath(path);
    const match: PathMatch<string> | null = useMatch({
        path: currentPath.pathname,
        end: false,
    });
    const isMatched: boolean = !!match;

    return (
        <li
            className={cn(
                'relative w-full text-center text-lg text-white transition-all duration-300',
                isMatched ? 'bg-red-900' : 'hover:bg-red-900/30',
            )}
        >
            <Link to={path} className="block w-full py-3">
                {children}
            </Link>
        </li>
    );
};

export default SidebarLink;
