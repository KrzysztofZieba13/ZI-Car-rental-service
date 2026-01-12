import { cn } from '../../utils/util.ts';

interface ImageProps {
    srcWEBP: string;
    srcJPG: string;
    alt: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    className?: string;
}

const Image = ({
    srcWEBP,
    srcJPG,
    alt,
    fetchPriority = 'auto',
    className,
}: ImageProps) => {
    return (
        <div>
            <picture>
                <source srcSet={srcWEBP} />
                <img
                    src={srcJPG}
                    alt={alt}
                    fetchPriority={fetchPriority}
                    className={cn(
                        'h-full w-full object-cover object-center',
                        className,
                    )}
                />
            </picture>
        </div>
    );
};

export default Image;
