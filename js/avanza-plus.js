var AvanzaPlus = (function () {
    function AP () {}

    AP.prototype.round = function (num, decimals) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };

    AP.prototype.getValueTable = function (caption) {
        return $('caption h2').filter(function () {
            var tableCap = $(this).text().toLowerCase(),
                compCap = caption.toLowerCase();

            return (tableCap === compCap);
        }).eq(0).closest('table');
    };

    AP.prototype.toCommaDecimal = function (dec) {
        return dec.toString().replace('.', ',');
    };

    AP.prototype.cleanParsedNum = function (num) {
        if (typeof num === 'number') {
            return num;
        }

        return parseFloat(num.replace(/\s/g, '').replace(/,/g, '.'), 10);
    };

    AP.prototype.onPageLoad = function (path, cb) {
        if (new RegExp(path).test(location.pathname)) {
            window.onload = cb;
        }
    };

    return new AP();
})();