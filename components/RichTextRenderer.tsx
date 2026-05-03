import React, { JSX } from 'react';

type RichTextNode = {
  type?: string;
  children?: RichTextNode[];
  text?: string;
  format?: number;
  tag?: string;
  value?: string | Record<string, unknown>;
  fields?: Record<string, unknown>;
  url?: string;
  alt?: string;
  filename?: string;
  relationTo?: string;
};

function getFormatTags(format: number): { bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean } {
  return {
    bold: !!(format & 1),
    italic: !!(format & 2),
    underline: !!(format & 8),
    strikethrough: !!(format & 16),
  };
}

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  if (node.type === 'text') {
    const { bold, italic, underline, strikethrough } = getFormatTags(node.format || 0);

    let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
    if (bold) text = <strong key={index}>{text}</strong>;
    if (italic) text = <em key={index}>{text}</em>;
    if (underline) text = <u key={index}>{text}</u>;
    if (strikethrough) text = <s key={index}>{text}</s>;
    return text;
  }

  const children = node.children?.map((child, i) => renderNode(child, i)) || [];

  switch (node.type) {
    case 'heading':
      const Tag = node.tag as keyof JSX.IntrinsicElements || 'h2';
      const headingClass = {
        h1: 'text-3xl font-bold mt-6 mb-4',
        h2: 'text-2xl font-bold mt-5 mb-3',
        h3: 'text-xl font-semibold mt-4 mb-2',
        h4: 'text-lg font-semibold mt-3 mb-2',
        h5: 'text-base font-semibold mt-2 mb-1',
        h6: 'text-sm font-semibold mt-2 mb-1',
      }[Tag as string] || 'text-xl font-bold mt-4 mb-2';
      return React.createElement(Tag, { key: index, className: headingClass }, ...children);
    case 'paragraph':
      return <p key={index} className="mb-4 leading-relaxed">{children}</p>;
    case 'list':
      const ListTag = node.tag === 'ol' ? 'ol' : 'ul';
      return React.createElement(ListTag, { key: index, className: 'list-disc pl-6 mb-4 space-y-1' }, ...children);
    case 'listitem':
      return <li key={index}>{children}</li>;
    case 'quote':
      return <blockquote key={index} className="border-l-4 border-text-green pl-4 italic my-4 text-text-grey-dark">{children}</blockquote>;
    case 'link':
      const href = typeof node.value === 'string' 
        ? node.value 
        : (node.fields?.url as string) || '#';
      return <a key={index} href={href as string} target="_blank" rel="noopener noreferrer" className="text-text-green underline">{children}</a>;
    case 'upload': {
      const uploadValue = node.value as Record<string, unknown> | undefined;
      const imgSrc = (uploadValue?.url as string) || node.url || (uploadValue?.filename as string ? `/api/media/file/${uploadValue?.filename}` : '');
      if (imgSrc) {
        return (
          <div key={index} className="my-6">
            <img src={imgSrc} alt={(uploadValue?.alt as string) || node.alt || ''} className="w-full h-auto rounded-lg object-cover" />
          </div>
        );
      }
      return null;
    }
    default:
      return <span key={index}>{children}</span>;
  }
}

export default function RichTextRenderer({ content }: { content: Record<string, unknown> | null | undefined }) {
  if (!content) return null;

  const root = content.root as RichTextNode | undefined;
  if (!root?.children) return null;

  return (
    <div className="prose prose-sm max-w-none font-[inter] text-text-grey-mid">
      {root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
