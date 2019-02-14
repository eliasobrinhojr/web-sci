// Call the dataTables jQuery plugin
$(document).ready(function () {

    var table = $('#table_fornecedores').DataTable({

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
    getDataFornecedores();
    $('#table_fornecedores tbody').on('click', 'tr', function () {

        var data = table.row(this).data();
        console.log(data);
        
        $('#modal').modal({
            backdrop: 'static'
        });
    });
});
function getDataFornecedores() {

    var url_server = "http://dev.grupois.mao:8080/ws-informix/fornecedores";
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url_server,
        success: function (dados) {

            populateDataTableForn(dados.fornecedores);
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function populateDataTableForn(data) {
    $("#table_fornecedores").DataTable().clear();
    $("#lbFornecedores").html('Fornecedores (' + data.length + ")");
    for (var i = 0; i < data.length; i++) {
        var forn = data[i];

        var forcod = forn.forcod != null ? forn.forcod : 0,
                forpjf = forn.forpjf != null ? forn.forpjf.trim() : "",
                forcnpjcpf = forn.forcnpjcpf != null ? forn.forcnpjcpf.trim() : "",
                forbai = forn.forbai != null ? forn.forbai.trim() : "",
                fornome = forn.fornome != null ? forn.fornome.trim() : "",
                formun = forn.formun != null ? forn.formun.trim() : "",
                forend = forn.forend != null ? forn.forend.trim() : "",
                forcep = forn.forcep != null ? forn.forcep.trim() : "",
                foruf = forn.foruf != null ? forn.foruf.trim() : "",
                forfone = forn.forfone != null ? forn.forfone.trim() : "",
                forfax = forn.forfax != null ? forn.forfax.trim() : "",
                foremail = forn.foremail != null ? forn.foremail.trim() : "",
                esrcod = forn.esrcod != null ? forn.esrcod : 0,
                fornum = forn.fornum != null ? forn.fornum : 0,
                muncod = forn.muncod != null ? forn.muncod : 0;


        $('#table_fornecedores').dataTable().fnAddData([
            forcod,
            forpjf,
            forcnpjcpf,
            forbai,
            fornome,
            formun,
            forend,
            forcep,
            foruf,
            forfone,
            forfax,
            foremail,
            esrcod,
            fornum,
            muncod
        ]);
    }
}


