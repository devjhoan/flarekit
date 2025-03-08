import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, type User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
	const { data, isPending, refetch } = authClient.useSession();
	const [isLoading, setIsLoading] = useState(false);
	const user = data?.user as User | undefined;

	const [formData, setFormData] = useState({
		name: user?.name || "",
		image: user?.image || "",
	});

	if (isPending || !user) {
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await authClient.updateUser({
				name: formData.name,
				image: formData.image,
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			refetch();
			toast.success("Información actualizada correctamente");
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error("Error al actualizar la información del usuario");
			}
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.substring(0, 2);
	};

	return (
		<div className="space-y-4">
			<section className="border bg-sidebar rounded-lg p-6">
				<h1 className="text-2xl font-bold tracking-tight">Configuración de la cuenta</h1>
				<p className="text-muted-foreground">
					Administra la configuración de tu cuenta y cambia tu información personal.
				</p>
			</section>

			<section className="grid grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Perfil</CardTitle>
						<CardDescription>
							Actualiza tu información personal y cómo te muestras a otros usuarios.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="flex flex-col gap-6 md:flex-row">
								<div className="flex-1 space-y-5">
									<div className="space-y-2">
										<Label htmlFor="name">Nombre completo</Label>
										<Input
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											disabled={isLoading}
											required
										/>
										<p className="text-xs text-muted-foreground">
											Este nombre se mostrará en tu perfil y en los comentarios.
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="email">Correo electrónico</Label>
										<Input id="email" name="email" value={user.email} disabled={true} readOnly />
										<p className="text-xs text-muted-foreground">
											El correo electrónico no puede ser modificado.
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="image">URL de la imagen de perfil</Label>
										<Input
											id="image"
											name="image"
											value={formData.image}
											onChange={handleChange}
											disabled={isLoading}
											placeholder="https://ejemplo.com/mi-imagen.jpg"
										/>
										<p className="text-xs text-muted-foreground">
											La imagen de perfil se mostrará en tu perfil y en los comentarios.
										</p>
									</div>
								</div>

								<div className="flex flex-col items-center space-y-4">
									<div className="text-center">
										<p className="text-sm font-medium mb-2">Vista previa</p>
										<Avatar className="h-24 w-24">
											<AvatarImage src={formData.image} alt={formData.name} />
											<AvatarFallback className="text-lg">{getInitials(formData.name)}</AvatarFallback>
										</Avatar>
									</div>
								</div>
							</div>

							<div className="flex justify-end">
								<Button type="submit" disabled={isLoading} loading={isLoading}>
									{/* {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
									Guardar cambios
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Información de la cuenta</CardTitle>
						<CardDescription>Detalles sobre tu cuenta y nivel de acceso.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid grid-cols-1 gap-4">
								<div>
									<p className="text-sm font-medium text-muted-foreground">ID de usuario</p>
									<p className="text-sm font-mono">{user.id}</p>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Rol</p>
									<Badge className="capitalize">{user.role}</Badge>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Email verificado</p>
									<Badge variant={user.emailVerified ? "default" : "secondary"}>
										{user.emailVerified ? "Sí" : "No"}
									</Badge>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Fecha de registro</p>
									<Badge variant="secondary">{new Date(user.createdAt).toLocaleDateString()}</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</section>
		</div>
	);
}
