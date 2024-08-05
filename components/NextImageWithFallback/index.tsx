import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';

export interface NextImageWithFallbackProps extends ImageProps {
  onErrorRender?: () => JSX.Element;
  containerClassName?: string;
  onErrorSrc?: string;
}

const NextImageWithFallback = React.forwardRef<
  HTMLImageElement,
  NextImageWithFallbackProps
>(
  (
    {
      className,
      containerClassName,
      onErrorRender,
      onErrorSrc,
      src,
      alt,
      ...props
    },
    ref
  ) => {
    const [handleFallback, setHandleFallback] = useState<boolean>(false);

    useEffect(() => {
      if (!src && !onErrorSrc) {
        setHandleFallback(true);
      }
    }, [onErrorSrc, src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (props.onError) {
        props.onError(e);
      } else if (
        onErrorSrc &&
        (e.target as HTMLImageElement).src !== onErrorSrc
      ) {
        (e.target as HTMLImageElement).src = onErrorSrc;
        (e.target as HTMLImageElement).onerror = null;
      } else if (onErrorRender) {
        setHandleFallback(true);
      } else {
        setHandleFallback(false);
      }
    };

    return (
      <>
        <div className={`relative ${containerClassName || ''}`}>
          {(handleFallback && onErrorRender) || !src ? (
            onErrorRender!()
          ) : (
            <Image
              src={(src || onErrorSrc) as string}
              alt={alt || ''}
              onError={handleError}
              className={className}
              {...props}
            />
          )}
        </div>
      </>
    );
  }
);

NextImageWithFallback.displayName = 'NextImageWithFallback';

export { NextImageWithFallback };
