export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatDateShort = (dateString) => {
  const options = {
    month: 'short',
    day: 'numeric',
  };

  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return formatDateShort(dateString);
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
};
