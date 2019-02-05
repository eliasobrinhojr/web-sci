$(document).ready(function () {
    init();
    $(function () {
        $('#modalToggle').click(function () {
            $('#modal').modal({
                backdrop: 'static'
            });
        });
        $('#infoContinue').click(function (e) {
            e.preventDefault();
            var msg = '';
            var obj = {cnpj: $('#cnpj').val(),
                inscMunicipal: $('#inscrMunicipal').val(),
                razaoSocial: $('#razaoSocial').val(),
                id_atividade: $('#selectAtividade').val(),
                numero: $('#endNumero').val(),
                complemento: $('#empcomplemento').val(),
                respNome: $('#respnome').val(),
                respCpf: $('#respcpf').val(),
                logNome: $('#lognome').val(),
                logCidade: 0
            };
            if (obj.cnpj.trim() == '') {
                msg += '\nCnpj Obrigatório\n';
            }
            if (obj.inscMunicipal.trim() == '') {
                msg += '\nIncrição Municipal Obrigatória\n';
            }
            if (obj.razaoSocial.trim() == '') {
                msg += '\nRazao Social Obrigatória\n';
            }
            if (obj.id_atividade == 0) {
                msg += '\nTipo Atividade Obrigatório\n';
            }


            if (msg == '') {
                $('.progress-bar').css('width', '40%');
                $('.progress-bar').html('Passo 2 de 4');
                $('#myTab a[href="#ads"]').tab('show');
            } else {
                alert(msg);
            }
            msg = '';
        });
        $('#respContinue').click(function (e) {
            e.preventDefault();
            var msg = '';
            var respNome = $('#respnome').val();
            var respCpf = $('#respcpf').val();
            if (respNome.trim() == '') {
                msg += '\nNome Obrigatório\n';
            }
            if (respCpf.trim() == '') {
                msg += '\nCpf Obrigatório\n';
            }

            if (msg == '') {
                $('.progress-bar').css('width', '60%');
                $('.progress-bar').html('Passo 3 de 4');
                $('#myTab a[href="#schedulePanel"]').tab('show');
            } else {
                alert(msg);
            }
            msg = '';
        });
        $('#logContinue').click(function (e) {
            e.preventDefault();
            var msg = '';
            var logCidade = 0;
            var log_id = $("#logLogradouro");
            var crt = log_id.typeahead("getActive");
            var numero = $('#endNumero').val();
            var complemento = $('#empcomplemento').val();


            if (crt == undefined) {
                msg += '\nLogradouro Obrigatório\n';
            }
            if (numero == '') {
                msg += '\nNúmero Obrigatório\n';
            }

            if (complemento.trim() == '') {
                msg += '\nComplemento Obrigatório\n';
            }

            var $input = $(".typeahead");
            var current = $input.typeahead("getActive");
            if (current == undefined) {
                msg += '\nCidade Obrigatória\n';
            }

            if (msg == '') {
                $('.progress-bar').css('width', '100%');
                $('.progress-bar').html('Passo 4 de 4');
                $('#myTab a[href="#reviewPanel"]').tab('show');
            } else {
                alert(msg);
            }
            msg = '';
        });
        $('#activate').click(function (e) {
            e.preventDefault();

            var log_id = $("#logLogradouro");
            var crt = log_id.typeahead("getActive");


//            alert(JSON.stringify({
//                idEmp: $('#idEmp').val(),
//                cnpj: $('#cnpj').val(),
//                inscMunicipal: $('#inscrMunicipal').val(),
//                razaoSocial: $('#razaoSocial').val(),
//                id_atividade: $('#selectAtividade').val(),
//                numero: $('#endNumero').val(),
//                complemento: $('#empcomplemento').val(),
//                respNome: $('#respnome').val(),
//                respCpf: $('#respcpf').val(),
//                logNome: $('#lognome').val(),
//                logId: crt.id
//            }));

            if (crt != undefined) {

                var url = "http://dev.grupois.mao/sciweb/ws-sci/service/empresa/create.php";
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: url,
                    data: JSON.stringify({
                        idEmp: $('#idEmp').val(),
                        cnpj: $('#cnpj').val(),
                        inscMunicipal: $('#inscrMunicipal').val(),
                        razaoSocial: $('#razaoSocial').val(),
                        id_atividade: $('#selectAtividade').val(),
                        numero: $('#endNumero').val(),
                        complemento: $('#empcomplemento').val(),
                        respNome: $('#respnome').val(),
                        respCpf: $('#respcpf').val(),
                        logNome: $('#lognome').val(),
                        logId: crt.id
                    }),
                    success: function (dados) {
                        alert(dados.message);

                    }
                });
            } else {
                var txt = '';
            }


        });
    });
}
);
function init() {
    carregaComboEmpresaAtividade();
    configuraAutocompleteCidade();
}


function configuraAutocompleteCidade() {

    var url_local = "http://dev.grupois.mao/sciweb/ws-sci/service/cidade/read.php";
    $.ajax({
        type: 'GET',
        url: url_local,
        dataType: 'json',
        success: function (data) {

            var $input = $(".typeahead");
            $input.typeahead({
                source: data.body,
                autoSelect: true
            });
            $input.change(function () {
                var current = $input.typeahead("getActive");
                if (current) {

                    if (current.name == $input.val()) {

                        configuraAutocompleteLogradouro(current.id);

                    }
                }
            });
        }, error: function (result) {
            console.log(result);
        }
    });
}

function configuraAutocompleteLogradouro(id_cidade) {
    var url_local = "http://dev.grupois.mao/sciweb/ws-sci/service/logradouro/read.php?id_cidade=" + id_cidade;

    $.ajax({
        type: 'GET',
        url: url_local,
        dataType: 'json',
        success: function (data) {


            $("#logLogradouro").typeahead({
                source: data.body,
                autoSelect: true
            });

        }, error: function (result) {
            console.log(result);
        }
    });
}


function carregaComboEmpresaAtividade() {
    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/empresaAtividade/read.php";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {

            $('select[name=selectAtividade]').append('<option selected value="0">Selecione</option>');
            for (i = 0; i < data.count; i++) {
                $('select[name=selectAtividade]').append('<option value="' + data.body[i].emaidEmpresaAtividade + '">' + data.body[i].emaNome + '</option>');
            }

        }, error: function (result) {
            console.log(result);
        }
    });
}



