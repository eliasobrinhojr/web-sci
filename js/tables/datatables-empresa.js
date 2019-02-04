// Call the dataTables jQuery plugin
$(document).ready(function () {

    var table = $('#table_empresas').DataTable({

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

    getDataEmpresas();


    $('#table_empresas tbody').on('click', 'tr', function () {

        var data = table.row(this).data();


        //informacoes empresa

        $('#idEmp').val(data[0]);
        $('#cnpj').val(data[1]);
        $('#inscrMunicipal').val(data[2]);
        $('#razaoSocial').val(data[3]);

        //responsavel
        $('#respcpf').val(data[11]);
        $('#respnome').val(data[12]);

        //endereço
        $('#empcomplemento').val(data[8]);
        $('#logcep').val(data[5]);





        $('#modal').modal({
            backdrop: 'static'
        });
    });
});

function getDataEmpresas() {

    var url_local = "http://localhost:8080/ws-ssp/empresas";
    var url_server = "http://dev.grupois.mao:8080/ws-informix/empresas";

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url_server,
        success: function (dados) {
            populateDataTable(dados.empresas);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function populateDataTable(data) {
    $("#table_empresas").DataTable().clear();

    for (var i = 0; i < data.length; i++) {
        var emp = data[i];

        var cdemp = emp.cdemp != null ? emp.cdemp : "",
                cdcgc = emp.cdcgc != null ? emp.cdcgc : " ",
                cdmun = emp.cdmun != null ? emp.cdmun : " ",
                dsemp = emp.dsemp != null ? emp.dsemp : " ",
                ativi = emp.ativi != null ? emp.ativi : " ",
                cdcep = emp.cdcep != null ? emp.cdcep : " ",
                cdtri = emp.cdtri != null ? emp.cdtri : " ",
                compr = emp.compr != null ? emp.compr : " ",
                ender = emp.ender != null ? emp.ender : " ",
                nfts_sp = emp.nfts_sp != null ? emp.nfts_sp : " ",
                cdsynchro = emp.cdsynchro != null ? emp.cdsynchro : " ",
                resp_cpf = emp.resp_cpf != null ? emp.resp_cpf : " ",
                responsavel = emp.responsavel != null ? emp.responsavel : " ",
                uf = emp.uf != null ? emp.uf : " ";

        $('#table_empresas').dataTable().fnAddData([
            cdemp,
            cdcgc,
            cdmun,
            dsemp,
            ativi,
            cdcep,
            cdtri,
            compr,
            ender,
            nfts_sp,
            cdsynchro,
            resp_cpf,
            responsavel,
            uf
        ]);


    }
}


