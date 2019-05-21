const startsWithDash = x => x.startsWith('-');

const getIndex = element => !startsWithDash(element);

const filterOption = function (inputArgs) {
    let firstIndex = inputArgs.findIndex(getIndex);
    return inputArgs.slice(0, firstIndex).map(x => x.slice(1));
};

const optionsSpliter = function (options) {
    return options.join(',').split('').filter(x => x != ',');
};

const optionsParser = function (options, possibleOptions) {
    if (!options.length) {
        options = possibleOptions;
    }
    return optionsSpliter(options);
};

const parser = function (inputArgs) {
    let options = filterOption(inputArgs);
    let files = inputArgs.slice(options.length);
    return { options, files };
};

module.exports = {
    parser,
    optionsParser,
    filterOption,
    optionsSpliter
};
