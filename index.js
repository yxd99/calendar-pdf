const fs = require('fs');
const pdf = require('html-pdf-node');
const { getDate, createCalendarHTML } = require('./helpers/functions.js');

const year = 2022;

const dir = `./calendar-${year}`;

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

for(let i = 0; i < 12; i++){
    let date = getDate(year, i);
    content = createCalendarHTML(date);
    let path = `${dir + '/' + date.month}.pdf`;
    const options = {
        path,
        printBackground: true,
        landscape: true,
        margin: {
            bottom: 6
        }
    };
    const file = {
        content
    }
    pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log('Archivo creado.');
    });
}


