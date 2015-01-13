var AvanzaPlus = (function () {
    var experiments = {};

    function AP () {}

    AP.prototype.round = function (num, decimals) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };

    AP.prototype.randomNum = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    AP.prototype.getRandomColor = function () {
        var colors = ['#577AA6', '#009640', '#FDC55A'];
        return colors[this.randomNum(0, colors.length - 1)];
    };

    AP.prototype.onPageLoad = function (path, cb) {
        if (new RegExp(path).test(location.pathname)) {
            window.onload = cb.bind(this);
        }
    };

    AP.prototype.experimental = function (feature, def) {
        if (def === undefined) {
            if (typeof experiments[feature] === 'function') {
                experiments[feature].call(this);
            } else {
                throw new Error('No feature with that name.');
            }
        } else {
            experiments[feature] = def;
        }
    };

    return new AP();
})();
AvanzaPlus.onPageLoad('/mina-sidor/kontooversikt.*', function () {
    var self = this;

    // STOCK SHARE OF TOTAL HOLDINGS
    var addShareToTable = function (table, marketTotal) {
        var tableShare = $.trim(table.find('caption .allocation').text().split(':')[1]),
            th = '<th data-sorter="commaDigit"><a href="javascript:void(0);" class="noWrap">Andel %</a></th>',
            td = '<td>' + tableShare + '</td>',
            rowShare;

        $(th).insertAfter(table.find('th').eq(2)).css('width', 30);
        $(td).insertAfter(table.find('tfoot td').eq(0));

        table.find('tr.clientSortedRow').each(function () {
            var $row = $(this),
                marketValue = self.cleanParsedNum($row.find('> td').eq(8).text()),
                share = self.toCommaDecimal(self.round(marketValue / marketTotal * 100, 2)),
                td = '<td>' + share + '</td>';

            $(td).insertAfter($row.find('td').eq(2));
        });
    };

    var marketTotal = this.cleanParsedNum($('.tableSummary').find('.value').text());

    addShareToTable(this.getValueTable('aktier'), marketTotal);
    addShareToTable(this.getValueTable('fonder'), marketTotal);

    // Hack to make sorting work on share of holdings-column
    $('.headerSortUp, .headerSortDown').trigger('click').trigger('click');
});