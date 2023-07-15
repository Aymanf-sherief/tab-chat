import classnames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import urlMetadata from "url-metadata";
import { config } from "../../config";

type LinkPreviewProps = {
  url: string;
  className?: string;
};

type MetaData = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export const LinkPreview: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & LinkPreviewProps
> = ({ url, className, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [urlMeta, setUrlMeta] = useState<urlMetadata.Result>();

  useEffect(() => {
    setLoading(true);
    urlMetadata(config.corsProxyUr + encodeURIComponent(url))
      .then((metadata) => {
        setUrlMeta(metadata);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [url]);

  const metaData: MetaData = useMemo(() => {
    return {
      title: (urlMeta?.title ||
        urlMeta?.["og:title"] ||
        urlMeta?.["twitter:title"] ||
        urlMeta?.["og:site_name"] ||
        "") as string,
      description: (urlMeta?.description ||
        urlMeta?.["og:description"] ||
        urlMeta?.["twitter:description"] ||
        "") as string,
      image: (urlMeta?.image ||
        urlMeta?.["og:image"] ||
        urlMeta?.["twitter:image"] ||
        "") as string,
      url,
    };
  }, [urlMeta, url]);

  return (
    <div
      className={classnames(
        className,
        "border border-gray-200 shadow m-10 p-2 w-full"
      )}
      {...rest}
    >
      {loading ? (
        <div className="text-center">loading...</div>
      ) : (
        <a
          className="flex flex-col gap-2 justify-center items-center text-sm w-full"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {!metaData?.title && !metaData?.description && !metaData?.image && (
            <p className="text-red-500">no preview available!</p>
          )}
          {metaData?.title && <div>{metaData.title}</div>}
          {metaData?.description && <div>{metaData.description}</div>}
          {metaData?.image && (
            <img
              className="self-center w-20 h-20"
              src={metaData.image}
              alt={metaData.title}
            />
          )}
        </a>
      )}
    </div>
  );
};
