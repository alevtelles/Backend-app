import bcrypt from "bcrypt";

export const hashValue = async (
	value: string,
	saltRounds = 10,
): Promise<string> => {
	return await bcrypt.hash(value, saltRounds); // Retorna o valor hasheado
};

export const compareValue = async (
	value: string,
	hashedValue: string,
): Promise<boolean> => {
	return await bcrypt.compare(value, hashedValue); // Retorna um booleano
};
