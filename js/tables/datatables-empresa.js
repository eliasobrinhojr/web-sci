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

        $('#selectCidade').prop('disabled', true);
        $('#selectLogradouro').prop('disabled', true);

        $('#idEmp').val(data[0]);
        $('#cnpj').val(data[1].replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5"));
        $('#inscrMunicipal').val(data[2]);
        $('#razaoSocial').val(data[3]);

        //responsavel
        $('#respcpf').val(data[7].replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));
        $('#respnome').val(data[8]);

        //endereço
        $('#empcomplemento').val(data[6]);


        data[5] = data[5].replace('.', '');
        data[5] = data[5].replace('-', '');
        var strCep = data[5].replace(/^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/, "$1.$2-$3");
        $('#logCep').val(strCep.toString());

        if ($('#logCep').val().length < 10) {
            $("#logCep").css({
                "border-color": "red"
            });
            $("#divLoad").removeClass();
            $("#divLoad").addClass("loaderError");
            $("#lbAlertCep").html('Número do CEP inválido!');
            $("#lbAlertCep").css({
                "color": "red",
                "font-size": "15px"
            });

        } else if ($('#logCep').val().length == 10) {
            $("#logCep").css({
                "border-color": "green"
            });
            $("#divLoad").removeClass();
            $("#divLoad").addClass("loader");
            $("#lbAlertCep").html('Buscando...');
            $("#lbAlertCep").css({
                "color": "green",
                "font-size": "15px"
            });
            configuraEnderecoPorCep($('#logCep').val());
        }

        $('#selectAtividade').prop('selectedIndex', 0);
        $('#modal').modal({
            backdrop: 'static'
        });
        $('.progress-bar').css('width', '20%');
        $('.progress-bar').html('Passo 1 de 3');
        $('#myTab a[href="#infoPanel"]').tab('show');

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

            getEmpresasNovo(dados.empresas);

        },
        error: function (err) {
            console.log(err);
        }
    });
}



function getEmpresasNovo(empresas) {
    var url_server = "http://dev.grupois.mao/sciweb/ws-sci/service/empresa/read.php";

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url_server,
        success: function (dados) {
            // console.log(empresas[i].cdemp.replace(/^(0+)(\d)/g,"$2"));

            var ids = [];


            for (var j = 0; j < dados.body.length; j++) {
                ids.push(dados.body[j].id_empresa);
            }

            var result = empresas.filter(function (item) {
                return ids.indexOf(item.cdemp.replace(/^(0+)(\d)/g, "$2")) == -1;
            });

            populateDataTable(result);

        },
        error: function (err) {
            console.log(err);
        }
    });
}

function populateDataTable(data) {
    $("#table_empresas").DataTable().clear();

    $("#lbEmpresas").html('Empresas (' + data.length + ")");

    for (var i = 0; i < data.length; i++) {
        var emp = data[i];

        var cdemp = emp.cdemp != null ? emp.cdemp.trim() : "",
                cdcgc = emp.cdcgc != null ? emp.cdcgc.trim() : "",
                cdmun = emp.cdmun != null ? emp.cdmun.trim() : "",
                dsemp = emp.dsemp != null ? emp.dsemp.trim() : "",
                ativi = emp.ativi != null ? emp.ativi.trim() : "",
                cdcep = emp.cdcep != null ? emp.cdcep.trim() : "",
                ender = emp.ender != null ? emp.ender.trim() : "",
                resp_cpf = emp.resp_cpf != null ? emp.resp_cpf.trim() : "",
                responsavel = emp.responsavel != null ? emp.responsavel.trim() : "",
                uf = emp.uf != null ? emp.uf.trim() : "";




        $('#table_empresas').dataTable().fnAddData([
            cdemp,
            cdcgc,
            cdmun,
            dsemp,
            ativi,
            cdcep,
            ender,
            resp_cpf,
            responsavel,
            uf
        ]);


    }
}


