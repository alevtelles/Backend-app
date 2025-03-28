export const getEnv = (key: string, defaultValue = ""): string => {
	const value = process.env[key];
	if (value === undefined) {
		if (defaultValue) {
			return defaultValue;
		}
		throw new Error(`A variavél de ambiente ${key} não está definida`);
	}
	return value;
};
