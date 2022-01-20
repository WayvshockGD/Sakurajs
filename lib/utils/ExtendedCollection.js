module.exports = class ExtendedCollection extends Map {
    array() {
        let arr = [];

        for (let [key, value] of this.entries()) {
            arr.push(key, value);
        }

        return arr;
    }
}