// Function to format numbers with a thousands separator
export function formatNumberWithComma(number) {
	return new Intl.NumberFormat("en-US").format(number);
}
