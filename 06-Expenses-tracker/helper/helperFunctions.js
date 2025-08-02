export const formatINR = (amount) => {
    return amount.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})
}

export const getDay = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '';
        }
        return date.getDate();
    } catch (error) {
        console.log('Date parsing error:', error);
        return '';
    }
}