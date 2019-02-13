// Call the dataTables jQuery plugin
$(document).ready(function () {

    var table = $('#table_prestadores').DataTable({

        "processing": true,
        "paging": true,
        "scrollX": true,
        "language": {
            "lengthMenu": "_MENU_ registros por página",
            "zeroRecords": "Nada encontrado",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "Nenhum registro disponível",
            "infoFiltered": "(filtrado de _MAX_ registros no total)",
            "search": "Filtrar:",
            "paginate": {
                "first": "Primeiro",
                "last": "Ultimo",
                "next": "Próximo",
                "previous": "Anterior"
            }
        }
    });
    getDataPrestadores();
    $('#table_prestadores tbody').on('click', 'tr', function () {

        var data = table.row(this).data();
        console.log(data);
    });
});
function getDataPrestadores() {

    var url_server = "http://dev.grupois.mao:8080/ws-informix/prestadores";
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url_server,
        success: function (dados) {

            populateDataTable(dados.prestadores);
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function populateDataTable(data) {
    $("#table_prestadores").DataTable().clear();
    $("#lbPrestadores").html('Prestadores (' + data.length + ")");
    for (var i = 0; i < data.length; i++) {
        var forn = data[i];


        var cdpre = forn.cdpre != null ? forn.cdpre.trim() : "",
                cdirf = forn.cdirf != null ? forn.cdirf.trim() : "",
                idpre = forn.idpre != null ? forn.idpre.trim() : "",
                cdcgc = forn.cdcgc != null ? forn.cdcgc.trim() : "",
                cdmun = forn.cdmun != null ? forn.cdmun.trim() : "",
                dspre = forn.dspre != null ? forn.dspre.trim() : "",
                ender = forn.ender != null ? forn.ender.trim() : "",
                cdcep = forn.cdcep != null ? forn.cdcep.trim() : "",
                ctadi = forn.ctadi != null ? forn.ctadi.trim() : "",
                ctiss = forn.ctiss != null ? forn.ctiss.trim() : "",
                ctirf = forn.ctirf != null ? forn.ctirf.trim() : "",
                ctgps = forn.ctgps != null ? forn.ctgps.trim() : "",
                ctdesc = forn.ctdesc != null ? forn.ctdesc.trim() : "",
                ctjur = forn.ctjur != null ? forn.ctjur.trim() : "",
                nmpre = forn.nmpre != null ? forn.nmpre.trim() : "",
                stpre = forn.stpre != null ? forn.stpre.trim() : "",
                cdemp = forn.cdemp != null ? forn.cdemp.trim() : "",
                cdcent = forn.cdcent != null ? forn.cdcent.trim() : "",
                inscgps = forn.inscgps != null ? forn.inscgps.trim() : "",
                ctpcc = forn.ctpcc != null ? forn.ctpcc.trim() : "",
                ctcof = forn.ctcof != null ? forn.ctcof.trim() : "",
                ctpis = forn.ctpis != null ? forn.ctpis.trim() : "",
                ctcsl = forn.ctcsl != null ? forn.ctcsl.trim() : "",
                flinscprefsp = forn.flinscprefsp != null ? forn.flinscprefsp.trim() : "";

        $('#table_prestadores').dataTable().fnAddData([
            cdpre,
            cdirf,
            idpre,
            cdcgc,
            cdmun,
            dspre,
            ender,
            cdcep,
            ctadi,
            ctiss,
            ctirf,
            ctgps,
            ctdesc,
            ctjur,
            nmpre,
            stpre,
            cdemp,
            cdcent,
            inscgps,
            ctpcc,
            ctcof,
            ctpis,
            ctcsl,
            flinscprefsp
        ]);
    }
}


