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