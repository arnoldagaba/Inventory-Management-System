// Function to format numbers with a thousands separator
export function formatNumberWithComma(number) {
	return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatCurrency = (amount, currency = "UGX") => {
	return `${currency} ${formatNumberWithComma(amount)}`;
};

export const formatPercentage = (value, decimals = 1) => {
	return `${Number(value).toFixed(decimals)}%`;
};
