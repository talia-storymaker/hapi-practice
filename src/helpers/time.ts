module.exports = function() {
    let today = new Date();
    return `${today.getUTCHours()}:${today.getUTCMinutes()}`;
}