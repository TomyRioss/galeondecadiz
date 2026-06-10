import EbookAccess from "./EbookAccess";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EbookPage({ params }: Props) {
  const { slug } = await params;
  return <EbookAccess slug={slug} />;
}
