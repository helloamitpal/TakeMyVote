const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} : ${hour > 12 ? hour - 12 : (hour || 12)} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export { formatDate };
