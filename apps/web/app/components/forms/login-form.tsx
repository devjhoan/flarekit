import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { avaliableProviders } from "@/lib/constants";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

type Provider = keyof typeof avaliableProviders;

async function handleSocialLogin(provider: Provider, callbackURL: string) {
	return await authClient.signIn.social({
		provider,
		callbackURL,
	});
}

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams] = useSearchParams();

	const redirect = searchParams.get("redirect");
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setCredentials((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
					<CardDescription>
						Inicia sesión con tu cuenta de{" "}
						{Object.values(avaliableProviders)
							.map(({ name }) => name)
							.join(" o ")}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-6">
							<div
								className="grid max-w-full gap-2"
								style={{
									gridTemplateColumns: `repeat(${Object.keys(avaliableProviders).length > 1 ? "2" : "1"}, 1fr)`,
								}}
							>
								{Object.entries(avaliableProviders).map(([key, provider]) => (
									<Button
										key={key}
										variant="outline"
										disabled={isLoading}
										type="button"
										className="w-full dark:bg-muted dark:hover:bg-muted/80"
										onClick={async (e) => {
											setIsLoading(true);
											e.preventDefault();

											try {
												const result = await handleSocialLogin(
													key as Provider,
													`${window.location.origin}${redirect ?? "/dashboard"}`,
												);

												if (result.error) {
													throw new Error(result.error.message);
												}
											} catch (error) {
												setIsLoading(false);
												console.error(error);

												if (error instanceof Error) {
													toast.error(error.message);
												}
											}
										}}
									>
										{<provider.icon />} {provider.name}
									</Button>
								))}
							</div>

							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-card px-2 text-muted-foreground">O continua con</span>
							</div>

							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Correo electrónico</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
										autoComplete="email"
										disabled={isLoading}
										value={credentials.email}
										onChange={handleChange}
									/>
								</div>

								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Contraseña</Label>
										<a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
											Olvidaste tu contraseña?
										</a>
									</div>

									<Input
										id="password"
										type="password"
										required
										autoComplete="current-password"
										disabled={isLoading}
										value={credentials.password}
										onChange={handleChange}
									/>
								</div>

								<Button type="submit" className="w-full" disabled={isLoading}>
									Iniciar sesión
								</Button>
							</div>

							<div className="text-center text-sm">
								¿No tienes una cuenta?{" "}
								<Link to="/register" className="underline underline-offset-4">
									Registrarse
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>

			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				Al continuar, aceptas nuestros <a href="#">Términos de servicio</a> y{" "}
				<a href="#">Política de privacidad</a>.
			</div>
		</div>
	);
}
