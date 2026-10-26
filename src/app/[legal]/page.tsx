import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegalDoc, legalDocs } from "@/data/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ legal: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  const doc = getLegalDoc(legal);
  return doc ? { title: `${doc.title} | Grefton`, description: doc.description } : {};
}

export default async function Page({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  const doc = getLegalDoc(legal);
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
