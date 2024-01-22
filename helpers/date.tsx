export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(date);
  };
