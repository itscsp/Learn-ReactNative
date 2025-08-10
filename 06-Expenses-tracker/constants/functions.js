export const chooseTitle = (action) => {
    switch(action){
        case 'ADD':
            return 'Add transaction';
        case 'EDIT':
            return 'Edit transaction'
        case 'DELETE':
            return 'Delete transaction'
        default: 
            return '';
    }   
}

export const goBack = (navigation) => {
    return navigation.goBack()
}

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export const getMonthByDate = (date) => {
    const d = new Date(date);
    return months[d.getMonth()];
}