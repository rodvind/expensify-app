// Get visible expenses
// const getVisibleExpenses = (expenses, filters) => {
//     return expenses;
// };
// Destructuring filters
// const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
//     // if startDate or endDate are not numbers(i.e.it's undefined) 
//     // then have both startDateMatch and endDateMatch evaluate to true
//     // so all expenses are shown regardless of their date.
//     // This is basically what happens when you boot the app up for the first time.
//     // The startDate and endDate are undefined in the beginning.
//     // If they aren't a number, we can assume that those dates haven't been set yet
//     // so by default startDateMatch and endDateMatch will be true
//     // rendering all of the expenses (based on their date).
//     // Figure out if a given expense happened after the date the user is trying to file by.
//     // This would allow us to show the expense since it would match the filter.
//     // We also check that the expense happened before the end date picked by the user.
//     return expenses.filter((expense) => {
//         // if first-part, type of startDate !== 'number',
//         // resaults in True, it is not a number,
//         // the item won't be filtered
//         const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
//         const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
//         // convert the description to lowercase, then convert the text to lowercase
//         const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

//         return startDateMatch && endDateMatch && textMatch;
//     }).sort((a, b) => {
//         if (sortBy === 'date') {
//             // -1, retuns a. 1 returns b: if b is greater than a, returns 1
//             return a.createdAt < b.createdAt ? 1 : -1;
//         } else if (sortBy === 'amount') {
//             return a.amount < b.amount ? 1 : -1;
//         }
//     });
// };

// Get visible expenses
// const getVisibleExpenses = (expenses, filters) => {
//     return expenses;
// };
import moment from 'moment';
// Destructuring filters
export default (expenses, { text, sortBy, startDate, endDate }) => {
    // if startDate or endDate are not numbers(i.e.it's undefined) 
    // then have both startDateMatch and endDateMatch evaluate to true
    // so all expenses are shown regardless of their date.
    // This is basically what happens when you boot the app up for the first time.
    // The startDate and endDate are undefined in the beginning.
    // If they aren't a number, we can assume that those dates haven't been set yet
    // so by default startDateMatch and endDateMatch will be true
    // rendering all of the expenses (based on their date).
    // Figure out if a given expense happened after the date the user is trying to file by.
    // This would allow us to show the expense since it would match the filter.
    // We also check that the expense happened before the end date picked by the user.
    return expenses.filter((expense) => {
        // if first-part, type of startDate !== 'number',
        // resaults in True, it is not a number,
        // the item won't be filtered
        //const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
        //const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        // convert the description to lowercase, then convert the text to lowercase
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            // -1, retuns a. 1 returns b: if b is greater than a, returns 1
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};