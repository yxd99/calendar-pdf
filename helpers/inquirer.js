const inquirer = require('inquirer');

const input = async (message) => {
    const res = await inquirer.prompt({
        message,
        name: 'input',
        type: 'input',
    });

    return res.input;
}

const number = async (message) => {
    const res = await inquirer.prompt({
        message,
        name: 'input',
        type: 'number',
    });

    return res.input;
}

const select = async (message, options) => {
    let choices = [];
    for(index in options){
        choices.push({
            value: index,
            name: options[index],
        })
    }
    const res = await inquirer.prompt({
        message,
        choices,
        name: 'select',
        type: 'list',
        loop: false
    });

    return res.select;
}

const confirm = async (message) => {
    const res = await inquirer.prompt({
        message,
        name: 'confirm',
        type: 'confirm',
    });

    return res.confirm;
}

module.exports = {
    input,
    select,
    number,
    confirm
}