import { LoginForm } from "@/components/forms/login-form";
import { authClient } from "@/lib/auth";
import { Navigate } from "react-router";
import { BRAND } from "@/lib/constants";

export default function LoginPage() {
	const { data, isPending } = authClient.useSession();

	if (isPending) {
		return null;
	}

	if (data?.user?.email) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-lg flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<BRAND.logo className="size-4" />
					</div>
					{BRAND.name}
				</a>

				<LoginForm />
			</div>
		</div>
	);
}
