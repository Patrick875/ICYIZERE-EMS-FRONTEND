export function sortDates(data) {
	return data.sort((a, b) => b.date - a.date);
}
export function barnumberGenerator(category) {
	// Generate a random 11-digit number
	const randomFraction = Math.random();
	const randomNumber = Math.floor(randomFraction * 90000000000) + 10000000000;

	// Combine random number and category length
	const barcodeWithoutCheckDigit =
		String(randomNumber) + String(category.length);

	return Number(barcodeWithoutCheckDigit);
}
