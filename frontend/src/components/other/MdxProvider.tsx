import { useEffect, useState } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-dev-runtime";
import type { MDXComponents } from "mdx/types";
import CallToAction from './CalltoAction'


type MdxRendererProps = {
  content: string;
};

export function MdxRenderer({ content }: MdxRendererProps) {
  const [CompiledMDX, setCompiledMDX] = useState<React.ComponentType<{ components?: MDXComponents }> | null>(null);

    const mdxComponents: MDXComponents = {
    CallToAction,
  };

  useEffect(() => {
    const compileMDX = async () => {
      try {
        const result = await evaluate(content, {
          ...runtime,
          development: import.meta.env.MODE === "development",
           // Optional; v3 supports this
        });

        setCompiledMDX(() => result.default as React.ComponentType<{ components?: MDXComponents }>);
      } catch (err) {
        console.error("❌ MDX evaluate error:", err);
      }
    };

    compileMDX();
  }, [content]);

  if (!CompiledMDX) return <p>Loading...</p>;

  return <CompiledMDX components={mdxComponents} />;
}