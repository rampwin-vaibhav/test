import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  onErrorRender?: () => JSX.Element;
  containerClassName?: string;
  onErrorSrc?: string;
}

const ImageWithFallback = React.forwardRef<
  HTMLImageElement,
  ImageWithFallbackProps
>(
  (
    { className, containerClassName, onErrorRender, onErrorSrc, ...props },
    ref
  ) => {
    const Comp = 'img';
    const [handleFallback, setHandleFallback] = useState<boolean>(false);

    useEffect(() => {
      if (!props.src && !onErrorSrc) {
        setHandleFallback(true);
      }
    }, [onErrorSrc, props.src]);

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
        <Head>
          {props.src && <link rel="preload" as="image" href={props.src} />}
        </Head>
        <div className={`relative ${containerClassName || ''}`}>
          {handleFallback && onErrorRender ? (
            onErrorRender()
          ) : (
            <Comp
              className={className}
              ref={ref}
              onError={handleError}
              src={props.src || onErrorSrc}
              {...props}
            />
          )}
        </div>
      </>
    );
  }
);

ImageWithFallback.displayName = 'ImageWithFallback';

export { ImageWithFallback };
