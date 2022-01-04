const { nameDays, nameMonths } = require('./dictionary.js');

const getDate = (year, month) => {

    const days = new Date(year, (month + 1), 0).getDate();
    const nameDay = nameDays[new Date(month == 12 ? year - 1 : year, month).getDay()];

    return {
        nameDay,
        days,
        year,
        month: nameMonths[month == 12 ? 0 : month],
    };
}

const createCalendarHTML = (data) => {
    const { nameDay, days, month, year } = data;
    const finishWeekend = (nameDay == 'Viernes' || nameDay == 'Sábado');
    const totalCells = finishWeekend ? 42 : 35;
    const valueHeight = finishWeekend ? 14 : 17;
    const border = `border: 1px black solid;`;
    const widthColumn = `width: 10%;`;
    const heightColumn = `height: ${valueHeight}vh;`;
    const colorTitle = `color: white; background-color: #22698a;`;
    const colorSubTitle = `color: white; background-color: #3491bd;`;
    const textTop = 'text-align: start; vertical-align: text-top;';
    let start = false;
    let numDay = 1;

    let content = `
        <table style="${border} width: 100%;">
            <tr>
                <th style="${colorTitle} font-size: 16pt;" colspan="7">${month + ' ' + year}</th>
                <th style="${border + textTop} color: #0000009f; text-decoration: underline;" rowspan="8">Notas:</th>
            </tr>
    `;

    content = content.concat('<tr>');
    for (day of nameDays) {

        content = content.concat(`
            <th style="${border + widthColumn + colorSubTitle}">${day}</th>
        `);
    }
    content = content.concat('</tr>');

    content = content.concat('<tr>');
    for (let i = 1; i <= totalCells; i++) {
        content = content.concat(`<td style="${border + heightColumn + textTop}">`);

        if(nameDay == nameDays[i-1] && !start){
            start = true;
        }

        if(start && numDay <= days){
            content = content.concat(`${numDay}`); 
            numDay++;
        }
        content = content.concat(`</td>`);
        
        if(i % 7 == 0 && i != totalCells){
            content = content.concat('</tr><tr>');
        }
    }
    content = content.concat('</tr>');


    content = content.concat(`
        </tbody>
        </table>
    `);
    return content;
}

module.exports = {
    getDate,
    createCalendarHTML
}