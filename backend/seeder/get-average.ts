export const getAverage = (numbers: number[]) =>
	numbers.reduce((acc, number) => acc + number, 0) / numbers.length;
