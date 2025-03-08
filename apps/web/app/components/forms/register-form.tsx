import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

async function handleRegister(credentials: {
	name: string;
	email: string;
	password: string;
}) {
	return await authClient.signUp.email({
		email: credentials.email,
		password: credentials.password,
		name: credentials.name,
	});
}

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (credentials.password !== credentials.confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		if (credentials.password.length < 8) {
			setError("La contraseña debe tener mínimo 8 caracteres");
			return;
		}

		setIsLoading(true);

		try {
			const data = await handleRegister({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
			});

			console.log(data);
		} catch (_) {
			setError("Ocurrió un error al crear la cuenta");
		} finally {
			setIsLoading(false);
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setCredentials((prev) => ({ ...prev, [event.target.name]: event.target.value }));
		setError(null);
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Crear una cuenta</CardTitle>
					<CardDescription>Regístrate con tu cuenta de Google o correo electrónico</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="name">Nombre completo</Label>
									<Input
										id="name"
										name="name"
										type="text"
										placeholder="John Doe"
										required
										disabled={isLoading}
										value={credentials.name}
										onChange={handleChange}
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="email">Correo electrónico</Label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="m@example.com"
										required
										disabled={isLoading}
										value={credentials.email}
										onChange={handleChange}
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="password">Contraseña</Label>
									<Input
										id="password"
										name="password"
										type="password"
										required
										disabled={isLoading}
										placeholder={"••••••••••"}
										value={credentials.password}
										onChange={handleChange}
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="confirmPassword">Confirmar contraseña</Label>
									<Input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										required
										disabled={isLoading}
										placeholder={"••••••••••"}
										value={credentials.confirmPassword}
										onChange={handleChange}
										aria-invalid={error ? "true" : "false"}
										aria-errormessage={error ? error : undefined}
									/>
									{error && <p className="text-sm text-destructive">{error}</p>}
								</div>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? <Loader2 className="size-4 animate-spin" /> : "Crear cuenta"}
								</Button>
							</div>

							<div className="text-center text-sm">
								¿Ya tienes una cuenta?{" "}
								<Link to="/login" className="underline underline-offset-4">
									Iniciar sesión
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>

			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
				Al continuar, aceptas nuestros <a href="#">Términos de servicio</a> y{" "}
				<a href="#">Política de privacidad</a>.
			</div>
		</div>
	);
}
