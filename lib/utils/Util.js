exports.compact = function(t, items) {
    if (!Array.isArray(items) && !items.length) {
        throw new TypeError("items in compactAndReturn is not a array or no items");
    }

    items[0] = items[1];
    return t;
}