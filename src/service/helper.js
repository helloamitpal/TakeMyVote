// common format date helper function to accept datetime string and returning
// date string in DD-MM-YYYY format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
};

export { formatDate };
