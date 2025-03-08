import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-background">
			<Card className="max-w-2xl w-full shadow-lg py-16">
				<CardHeader className="text-center space-y-1">
					<CardTitle className="text-6xl font-bold text-primary">404</CardTitle>
				</CardHeader>

				<CardContent className="text-center">
					<p className="text-xl text-muted-foreground">Página no encontrada</p>
					<p className="text-sm text-muted-foreground">
						Lo sentimos, no pudimos encontrar la página que estás buscando.
					</p>
				</CardContent>

				<CardFooter className="flex justify-center">
					<Button variant="default" onClick={() => window.history.back()} leftIcon={<ArrowLeftIcon />}>
						Volver atrás
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
