import { rolesWeights, sidebarItems } from "@/lib/constants";
import { Navigate, useLocation } from "react-router";
import { authClient, type User } from "@/lib/auth";

const excludedRoutes = ["/login", "/register", "/"];
const allRoutes = Object.values(sidebarItems).flat();

// Hook personalizado para obtener información de la sesión
export function useAuth() {
	const { data, error, isPending } = authClient.useSession();
	const user = data?.user as User;
	const isAuthenticated = !!data?.user?.email;

	return {
		user,
		error,
		isPending,
		isAuthenticated,
	};
}

// Hook para verificar si una ruta requiere autenticación
function useRequiresAuth(path: string) {
	return !excludedRoutes.includes(path);
}

// Hook para verificar si el usuario tiene permiso para acceder a una ruta
function useHasPermission(path: string, userRole: keyof typeof rolesWeights = "user") {
	const item = allRoutes.find((item) => item.url === path);
	const hasPermission =
		!item?.minimalRole ||
		rolesWeights[item.minimalRole as keyof typeof rolesWeights] <=
			rolesWeights[userRole as keyof typeof rolesWeights];

	return hasPermission;
}

export function ValidateAuth({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const { user, error, isPending, isAuthenticated } = useAuth();

	const requiresAuth = useRequiresAuth(location.pathname);
	const hasPermission = useHasPermission(
		location.pathname,
		(user?.role || "user") as keyof typeof rolesWeights,
	);

	// Estados de carga y error
	if (isPending) return null;
	if (error) return null;

	// Redirección si no está autenticado en una ruta protegida
	if (!isAuthenticated && requiresAuth) {
		return <Navigate to={`/login?redirect=${location.pathname}`} />;
	}

	// Redirección si no tiene permisos suficientes
	if (isAuthenticated && !hasPermission) {
		return <Navigate to="/dashboard" />;
	}

	return children;
}
