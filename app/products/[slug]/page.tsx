import { redirect } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export default async function ProductDetailRedirect({ params }: Props) {
  const { slug } = await params
  redirect(`/materials/${slug}`)
}
