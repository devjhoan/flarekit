import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Wrapper(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={cn(props.className)}>
			{props.children}
		</div>
	);
}
