window.onload = function () {
    (function () {
        var niceRound = function (val, decimals) {
                return Math.round(val * Math.pow(10, decimals)) /  Math.pow(10, decimals);
            },
            populateTable = function (name, marketTotal) {
                var $stockTable = $('caption h2').filter(function() {
                    return ($(this).text().toLowerCase() === name.toLowerCase());
                }).eq(0).closest('table');

                $('<th><a href="javascript:void(0);" class="noWrap">Andel %</a></th>').insertAfter($stockTable.find('th').eq(2)).css('width', 30);
                $('<td>' + $.trim($stockTable.find('caption .allocation').text().split(':')[1]) + '</td>').insertAfter($stockTable.find('tfoot td').eq(0));

                $stockTable.find('tr.clientSortedRow')
                .each(function () {
                    var $row = $(this),
                        marketValue = parseInt($row.find('> td').eq(8).text().replace(/\s/g, ''), 10);
                    $('<td>' + niceRound(marketValue / marketTotal * 100, 2) + '</td>').insertAfter($row.find('td').eq(2));

                });
            };

        var marketTotalValue = parseInt($('.tableSummary').find('.value').text().replace(/\s/g, ''), 10);

        populateTable('aktier', marketTotalValue);
        populateTable('fonder', marketTotalValue);
    })();
};