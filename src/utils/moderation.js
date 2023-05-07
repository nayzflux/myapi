const Filter = require('@duckodas/badwords');
const filter = new Filter();

module.exports.hasBadwords = (text) => {
    return filter.hasBadwords(text);
}

module.exports.isProfane = (text) => {
    return filter.isProfane(text);
}

module.exports.clean = (text) => {
    return filter.clean(text);
}