$(document).ready(function () {
    init();
    $(function () {
        var formValid = true;
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
            formValid = true;

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


                $("#reviewDiv").css({
                    display: "block"
                });
                //cnpj
                if ($('#cnpj').val().length < 14) {
                    $("#rvcnpj").css({
                        color: "red"
                    });
                    $('#rvcnpj').html($('#cnpj').val() + ' *(14 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvcnpj").css({
                        color: "green"
                    });
                    $('#rvcnpj').html($('#cnpj').val());
                }

                //inscricao municipal
                if ($('#inscrMunicipal').val().length > 14) {
                    $("#rvIncriMunicipal").css({
                        color: "red"
                    });
                    $('#rvIncriMunicipal').html($('#inscrMunicipal').val() + ' *(Máximo 14 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvIncriMunicipal").css({
                        color: "green"
                    });
                    $('#rvIncriMunicipal').html($('#inscrMunicipal').val());
                }

                //razao
                if ($('#razaoSocial').val().length > 100) {
                    $("#rvRazaoSocial").css({
                        color: "red"
                    });
                    $('#rvRazaoSocial').html($('#razaoSocial').val() + ' *(Máximo 100 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvRazaoSocial").css({
                        color: "green"
                    });
                    $('#rvRazaoSocial').html($('#razaoSocial').val());
                }

                //numero
                if ($('#endNumero').val().length > 5) {
                    $("#rvNumero").css({
                        color: "red"
                    });
                    $('#rvNumero').html($('#endNumero').val() + ' *(Máximo 5 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvNumero").css({
                        color: "green"
                    });
                    $('#rvNumero').html($('#endNumero').val());
                }


                //tipo atividade
                if ($('#selectAtividade').val().length > 10) {
                    $("#rvTipoAtividade").css({
                        color: "red"
                    });
                    $('#rvTipoAtividade').html($("#selectAtividade option:selected").text() + ' *(Máximo 10 (int ID) obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvTipoAtividade").css({
                        color: "green"
                    });
                    $('#rvTipoAtividade').html($("#selectAtividade option:selected").text());
                }

                //Complemento
                if ($('#empcomplemento').val().length > 100) {
                    $("#rvComplemento").css({
                        color: "red"
                    });
                    $('#rvComplemento').html($("#empcomplemento").val() + ' *(Máximo 100 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvComplemento").css({
                        color: "green"
                    });
                    $('#rvComplemento').html($("#empcomplemento").val());
                }

                //Responsável nome
                if ($('#respnome').val().length > 100) {
                    $("#rvResponsavelNome").css({
                        color: "red"
                    });
                    $('#rvResponsavelNome').html($("#respnome").val() + ' *(Máximo 100 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvResponsavelNome").css({
                        color: "green"
                    });
                    $('#rvResponsavelNome').html($("#respnome").val());
                }

                //Responsável CPF
                if ($('#respcpf').val().length > 14) {
                    $("#rvResponsavelCPF").css({
                        color: "red"
                    });
                    $('#rvResponsavelCPF').html($("#respcpf").val() + ' *(Máximo 14 caracteres obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvResponsavelCPF").css({
                        color: "green"
                    });
                    $('#rvResponsavelCPF').html($("#respcpf").val());
                }

                //Logradouro ID
                if (crt.id.length > 14) {
                    $("#rvLogradouroEnd").css({
                        color: "red"
                    });
                    $('#rvLogradouroEnd').html(crt.id + ' *(Máximo 10 (ID INT) obrigatórios)');
                    formValid = false;
                } else {
                    $("#rvLogradouroEnd").css({
                        color: "green"
                    });
                    $('#rvLogradouroEnd').html(crt.name);
                }


            } else {
                alert(msg);
            }
            msg = '';
        });

        $('#activate').click(function (e) {
            e.preventDefault();

            var log_id = $("#logLogradouro");
            var crt = log_id.typeahead("getActive");

            if (crt != undefined && formValid == true) {

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
                        $('#modal').modal('hide');
                        alert(dados.message);
                        getDataEmpresas();
                    }
                });
            } else {
                alert("Formulário inválido");
                $('.progress-bar').css('width', '20%');
                $('.progress-bar').html('Passo 1 de 4');
                $('#myTab a[href="#infoPanel"]').tab('show');
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



