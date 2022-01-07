const fs = require('fs');
const pdf = require('html-pdf-node');
const { number, select, confirm } = require('./helpers/inquirer.js');
const { getDate, createCalendarHTML } = require('./helpers/functions.js');
const { nameMonths } = require('./helpers/dictionary.js');

(async () => {
    console.log('Exportación de calendario en PDF!');
    const year = await number('Ingrese el año para obtener el calendario:');
    let option = await confirm('¿Desea exportar un mes en especifico? (Y = Si | N = No)');

    if (option) {
        const dir = `./calendar-${year}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const month = await select('¿Que mes desea para imprimir el calendario?', nameMonths);
        createCalendarPdf(year, parseInt(month), false);
    } else {
        const dir = `./calendar-${year}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        createCalendarPdf(year,  1);
    }
    console.log('Gracias por usar el sistema!');
})();

const createCalendarPdf = async (year, month, loop = true) => {
    if(month >=13) return;
    let date = getDate(year, month);
    content = createCalendarHTML(date);

    const file = {
        content,
    }

    const optionsPdf = {
        path: `./calendar-${year}/${date.month}.pdf`,
        printBackground: true,
        landscape: true,
        margin: {
            bottom: 6
        }
    };
    await pdf.generatePdf(file, optionsPdf).then(pdfBuffer => {
        if(!loop) return;
        createCalendarPdf(year, month + 1);
    });
}