import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import type { AuthContextType, UserType } from "./types";
import { api } from "../../sdk";

export const AuthContext = createContext<AuthContextType>({
	user: undefined,
	setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<UserType>();

	useEffect(() => {
		if (api.doesUserExist()) {
			api
				.getUser()
				.then((user) => {
					setUserData(user as UserType);
				})
				.catch(() => null);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user: userData, setUser: setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
