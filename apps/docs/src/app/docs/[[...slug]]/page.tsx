import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { type Feedback, Rate } from "@/app/components/rate";
import { Wrapper } from "@/app/components/wrapper";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";

async function onRateAction(url: string, _: Feedback) {
	"use server";
	console.log(url);
}

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{
				style: "clerk",
				single: false,
			}}
			article={{
				className: "max-sm:pb-16",
			}}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						...((await import("lucide-react")) as unknown as MDXComponents),
						Wrapper,
					}}
				/>
			</DocsBody>

			<Rate onRateAction={onRateAction} />
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
