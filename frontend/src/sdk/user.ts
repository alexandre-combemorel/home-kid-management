import { strapi } from "./base";

export const getUser = () => {
	return strapi.fetchUser();
};

export const doesUserExist = () => {
	return strapi.getToken();
};
