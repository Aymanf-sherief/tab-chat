import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { config } from "../../config";

type LinkPreviewProps = {
  url: string;
  className?: string;
};

type MetaData = {
  description: string;
  title: string;
  image: string;
  url: string;
};

export const LinkPreview: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & LinkPreviewProps
> = ({ url, className, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [urlMeta, setUrlMeta] = useState<MetaData>();

  const getMetaTagContent = useCallback(
    (dom: Document, metaTagSelector: string) =>
      dom.querySelector(`meta[${metaTagSelector}]`)?.getAttribute("content") ??
      "",
    []
  );

  useEffect(() => {
    setLoading(true);
    fetch(config.corsProxyUr + encodeURIComponent(url))
      .then((res) => res.text())
      .then((html) => {
        const linkDom = new DOMParser().parseFromString(html, "text/html");
        const description =
          getMetaTagContent(linkDom, "name=description") ||
          getMetaTagContent(linkDom, "property='og:description'");
        const image = getMetaTagContent(linkDom, "property='og:image'");
        const url = getMetaTagContent(linkDom, "property='og:url'");
        const title =
          getMetaTagContent(linkDom, "property='og:site_name'") ||
          getMetaTagContent(linkDom, "property='og:title'");
        setUrlMeta({ description, image, url, title });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [url, getMetaTagContent]);

  return (
    <div
      className={classnames(
        className,
        "border rounded-full border-gray-200 shadow m-10 p-2 w-full"
      )}
      {...rest}
    >
      {loading ? (
        <div className="text-center">loading...</div>
      ) : (
        <a
          className="flex flex-col gap-2 justify-center items-center text-sm w-full break-words px-10"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {!urlMeta?.description && !urlMeta?.image && (
            <p className="text-red-500">no preview available!</p>
          )}
          {urlMeta?.url && <div>{urlMeta.url}</div>}
          {urlMeta?.title && <div>{urlMeta.title}</div>}
          {urlMeta?.description && <div>{urlMeta.description}</div>}
          {urlMeta?.image && (
            <img
              className="self-center w-20 h-20"
              src={urlMeta.image}
              alt={urlMeta.description}
            />
          )}
        </a>
      )}
    </div>
  );
};
