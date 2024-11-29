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

export const abbreviateNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num;
};

export const formatAxisLabel = (value) => {
  if (typeof value === 'number') {
    return abbreviateNumber(value);
  }
  // For month names, use first 3 letters
  if (value && value.length > 3) {
    return value.substring(0, 3);
  }
  return value;
};
