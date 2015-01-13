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