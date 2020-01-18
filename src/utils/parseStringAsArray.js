module.exports = (array) => {
    return array.split(',').map(item => item.trim());
}