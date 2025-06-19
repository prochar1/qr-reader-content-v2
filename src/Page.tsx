import { JSX } from "react";
import ReactMarkdown from "react-markdown";
import Gallery from "./Gallery";
import VideoPlayer from "./VideoPlayer";

type PageProps = {
  content: string;
};

function parseContentWithMedia(content: string): JSX.Element[] {
  const elements: JSX.Element[] = [];
  let remainingContent = content;
  let key = 0;

  while (remainingContent) {
    // Hledáme galerii nebo video
    const galleryMatch = remainingContent.match(
      /\[GALLERY\]([\s\S]*?)\[\/GALLERY\]/
    );
    const videoMatch = remainingContent.match(/\[VIDEO\]([\s\S]*?)\[\/VIDEO\]/);

    // Najdeme, co je dříve
    let nextMatch = null;
    let matchType = null;

    if (galleryMatch && videoMatch) {
      if (galleryMatch.index! < videoMatch.index!) {
        nextMatch = galleryMatch;
        matchType = "gallery";
      } else {
        nextMatch = videoMatch;
        matchType = "video";
      }
    } else if (galleryMatch) {
      nextMatch = galleryMatch;
      matchType = "gallery";
    } else if (videoMatch) {
      nextMatch = videoMatch;
      matchType = "video";
    }

    if (!nextMatch) {
      // Žádné další media - přidat zbytek jako markdown
      if (remainingContent.trim()) {
        elements.push(
          <ReactMarkdown key={key++}>{remainingContent}</ReactMarkdown>
        );
      }
      break;
    }

    const beforeMedia = remainingContent.substring(0, nextMatch.index);
    const mediaContent = nextMatch[1];
    const afterMatch = nextMatch.index! + nextMatch[0].length;

    // Přidat obsah před mediem
    if (beforeMedia.trim()) {
      elements.push(<ReactMarkdown key={key++}>{beforeMedia}</ReactMarkdown>);
    }

    // Přidat galerii nebo video
    if (matchType === "gallery") {
      const images = mediaContent
        .trim()
        .split("\n")
        .map((line) => {
          const [src, alt] = line.split("|");
          return { src: src.trim(), alt: alt?.trim() || "" };
        })
        .filter((img) => img.src);

      if (images.length > 0) {
        elements.push(<Gallery key={key++} images={images} />);
      }
    } else if (matchType === "video") {
      const [src, title] = mediaContent.trim().split("|");
      if (src.trim()) {
        elements.push(
          <VideoPlayer
            key={key++}
            src={src.trim()}
            title={title?.trim() || undefined}
          />
        );
      }
    }

    // Pokračovat se zbytkem obsahu
    remainingContent = remainingContent.substring(afterMatch);
  }

  return elements;
}

export default function Page({ content }: PageProps) {
  const elements = parseContentWithMedia(content);

  return <div style={{ maxWidth: 800 }}>{elements}</div>;
}
