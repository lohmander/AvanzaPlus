AvanzaPlus.onPageLoad('/mina-sidor/kontooversikt.([0-9]{7}).*', function () {
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

    // TOTAL YIELD TODAY IN CASH
    var addTotalYieldToday = function (table) {
        var marketValue = self.cleanParsedNum(table.find('tfoot td').eq(4).text()),
            yieldPercentage = self.cleanParsedNum(table.find('tfoot td').eq(2).text()),
            totalYield = Math.round((marketValue - marketValue/(yieldPercentage/100 + 1)) * 100) / 100,
            th = '<th data-sorter="commaDigit" class="tRight"><a href="javascript:void(0);" class="noWrap">Avk. Idag</a></th>',
            td = '<td class="tRight '+ (totalYield > 0 ? 'positive' : (totalYield < 0 ? 'negative' : '')) +'">' + self.toCommaDecimal(totalYield) + '</td>',
            rowShare;

        $(th).insertAfter(table.find('th').eq(5)).css('width', 40);
        $(td).insertAfter(table.find('tfoot td').eq(2));

        table.find('tr.clientSortedRow').each(function () {
            var $row = $(this),
                marketValue = self.cleanParsedNum($row.find('> td').eq(9).text()),
                change = self.cleanParsedNum($row.find('> td').eq(5).text()),
                yield = Math.round((marketValue - marketValue/(change/100 + 1)) * 100) / 100,
                td = '<td class="tRight '+ (yield > 0 ? 'positive' : (yield < 0 ? 'negative' : '')) +'">' + self.toPrice(yield) + '</td>';

            $(td).insertAfter($row.find('td').eq(5));
        });
    };

    // ADJUST TOOLS SIZE TO NOT BREAK ROW
    var adjustToolsSize = function (table, width) {
        table.find('th.tools').css('width', width);
    };

    var marketTotal = this.cleanParsedNum($('.tableSummary').find('.value').text());

    addShareToTable(this.getValueTable('aktier'), marketTotal);
    addShareToTable(this.getValueTable('fonder'), marketTotal);
    addTotalYieldToday(this.getValueTable('aktier'));
    adjustToolsSize(this.getValueTable('aktier'), 50);

    // Hack to make sorting work on share of holdings-column
    $('.headerSortUp, .headerSortDown').trigger('click').trigger('click');
});
