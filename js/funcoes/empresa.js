$(document).ready(function () {
    init();
});
function init() {
    configuraTabs();
    carregaComboEmpresaAtividade();
    inputMask();


    $('#selectCidade').on('change', function () {
        carregaComboLogradouro(this.value);
    });

}

function configuraTabs() {
    $(function () {

        $('#modalToggle').click(function () {
            $('#modal').modal({
                backdrop: 'static'
            });
        });


        $('#infoContinue').click(function (e) {
            e.preventDefault();
            var msg = '';
            var obj = {
                cnpj: $('#cnpj').val(),
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
            } else if (!valida_cnpj(obj.cnpj.trim())) {
                msg += '\nCNPJ Inválido\n';
            }

            if (obj.inscMunicipal.trim() == '') {
                msg += '\nIncrição Municipal Obrigatória\n';
            }
            if (obj.razaoSocial.trim() == '') {
                msg += '\nRazão Social Obrigatória\n';
            }

            if (obj.id_atividade == null || obj.id_atividade == 0) {
                msg += '\nTipo Atividade Obrigatório\n';
            }


            if (msg == '') {
                $('.progress-bar').css('width', '60%');
                $('.progress-bar').html('Passo 2 de 3');
                $('#myTab a[href="#ads"]').tab('show');
            } else {
                alert(msg);
            }
            msg = '';
        });
        $('#respBack').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '20%');
            $('.progress-bar').html('Passo 1 de 3');
            $('#myTab a[href="#infoPanel"]').tab('show');

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
                msg += '\nCPF Obrigatório\n';
            } else {
                if (!validaCPF(respCpf)) {
                    msg += "\nCPF Inválido";
                }
            }

            if (msg == '') {
                $('.progress-bar').css('width', '100%');
                $('.progress-bar').html('Passo 3 de 3');
                $('#myTab a[href="#schedulePanel"]').tab('show');
            } else {
                alert(msg);
            }


            msg = '';
        });

        $('#logBack').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '40%');
            $('.progress-bar').html('Passo 2 de 3');
            $('#myTab a[href="#ads"]').tab('show');

        });
        $('#activate').click(function (e) {
            e.preventDefault();
            var msg = '';
            var endNumero = 0;

            if (validarCep($('#logCep').val())) {
                alert('número cép inválido');
            } else {


                if ($('#selectCidade').val() == null || $('#selectCidade').val() == 0) {
                    msg += '\nCidade Obrigatória !';
                }
                if ($('#selectLogradouro').val() == null || $('#selectLogradouro').val() == 0) {
                    msg += '\nLogradouro Obrigatório !';
                }

                if ($('#endNumero').val() != '') {
                    endNumero = $('#endNumero').val();
                }
                if ($('#idEmp').val() == '') {
                    msg += 'Código Empresa Inválido !!';
                }

                if (msg != '') {
                    alert(msg);
                } else {

                    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/empresa/empresa/create.php";
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
                            numero: endNumero,
                            complemento: $('#empcomplemento').val(),
                            respNome: $('#respnome').val(),
                            respCpf: $('#respcpf').val(),
                            logNome: $('#lognome').val(),
                            logId: $('#selectLogradouro').val()
                        }),
                        success: function (dados) {
                            getDataEmpresas();

                            $('#modal').modal('hide');
                            alert(dados.message);
                            $("#reviewDiv").css({
                                display: "none"
                            });
                            $('#selectCidade').html('');
                            $('#selectLogradouro').html('');
                        }
                    });
                }
                msg = '';
            }
        });
    });
}

function inputMask() {

    $("#cnpj").on("keyup", function (e)
    {
        $(this).val(
                $(this).val()
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5"));

        if ($(this).val().length == 18) {
            if (!valida_cnpj($(this).val().trim())) {
                $("#cnpj").css({
                    "border-color": "red"
                });
            } else {
                $("#cnpj").css({
                    "border-color": "green"
                });
            }
        } else {
            $("#cnpj").css({
                "border-color": "red"
            });
        }


    });

    $("#respcpf").on("keyup", function (e)
    {
        $(this).val(
                $(this).val()
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));

        if ($(this).val().length == 14) {
            if (!validaCPF($(this).val().trim())) {
                $("#respcpf").css({
                    "border-color": "red"
                });
            } else {
                $("#respcpf").css({
                    "border-color": "green"
                });
            }
        } else {
            $("#respcpf").css({
                "border-color": "red"
            });
        }
    });


    $("#logCep").on("keyup", function (e)
    {
        $(this).val(
                $(this).val()
                .replace(/\D/g, '')
                .replace(/^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/, "$1.$2-$3"));

        if ($(this).val().length == 10) {
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

            configuraEnderecoPorCep($(this).val());

        } else if ($(this).val().length < 10) {
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

            $('#selectCidade').prop('disabled', true);
            $('#selectLogradouro').prop('disabled', true);
            $('#selectLogradouro').html('');
            $('#selectCidade').html('');
        }
    });
}


function configuraEnderecoPorCep(cep) {

    var url_local = "http://dev.grupois.mao/sciweb/ws-sci/service/enderecamento/logradouro/read.php?acao=byCep&strCep=" + cep;
    $.ajax({
        type: 'GET',
        url: url_local,
        dataType: 'json',
        success: function (data) {

            if (data.count > 0) {

                $('#selectCidade').prop('disabled', false);
                $('select[name=selectCidade]').html('');
                $('select[name=selectCidade]').append('<option selected disabled value="0">Selecione</option>');

                for (i = 0; i < data.count; i++) {
                    if (data.count == 1) {
                        $('select[name=selectCidade]').append('<option selected value="' + data.body[i].cidadeId + '">' + data.body[i].cidadeNome + ' (' + data.body[i].estSigla + ')</option>');
                        carregaComboLogradouro(data.body[i].cidadeId);
                    } else {
                        $('select[name=selectCidade]').append('<option value="' + data.body[i].cidadeId + '">' + data.body[i].cidadeNome + ' (' + data.body[i].estSigla + ')</option>');

                    }
                }

                $("#divLoad").addClass("loaderSuccess");
                $("#lbAlertCep").html('Endereço encontrado !');
                $("#lbAlertCep").css({
                    "color": "green",
                    "font-size": "15px"
                });

            } else {
//procura no webService
                buscaViaCep(cep);

            }

        }, error: function (result) {
            console.log(result);
        }
    });
}

function buscaViaCep(cep) {

    var strCep = cep.replace('.', '');
    strCep = strCep.replace('-', '');

    var url_via_cep = "https://viacep.com.br/ws/" + strCep + "/json/";
    $.ajax({
        type: 'GET',
        url: url_via_cep,
        dataType: 'json',
        success: function (data) {



            var obj = {
                logNome: data["logradouro"],
                logCEP: data["cep"],
                logComplemento: data["complemento"],
                cidIdCidade: 0,
                cidadeNome: data["localidade"],
                uf: data["uf"]
            };

            //faz o post ao retornar 200, busca interno novamente  e carrega formulário
            insertLogradouro(obj);


        }, error: function (result) {
            console.log(result);
        }
    });
}

function insertLogradouro(obj) {
    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/enderecamento/logradouro/create.php";
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: url,
        data: JSON.stringify(obj),
        success: function (data) {

            console.log(data);
            configuraEnderecoPorCep(obj.logCEP);

        }, error: function (result) {
            console.log(result);
        }
    });
}

function carregaComboLogradouro(id_cidade) {
    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/enderecamento/logradouro/read.php?acao=byCidadeAndCep&id_cidade=" + id_cidade + "&strCep=" + $('#logCep').val();
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {

            $('#selectLogradouro').prop('disabled', false);
            $('select[name=selectLogradouro]').html('');
            $('select[name=selectLogradouro]').append('<option selected disabled value="0">Selecione</option>');

            for (i = 0; i < data.count; i++) {

                if (data.count == 1) {
                    $('select[name=selectLogradouro]').append('<option selected value="' + data.body[i].logId + '">' + data.body[i].logNome + '</option>');
                } else {
                    $('select[name=selectLogradouro]').append('<option value="' + data.body[i].logId + '">' + data.body[i].logNome + '</option>');

                }
            }


        }, error: function (result) {
            console.log(result);
        }
    });
}

function carregaComboEmpresaAtividade() {
    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/empresa/empresaAtividade/read.php";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {

            $('select[name=selectAtividade]').append('<option selected disabled value="0">Selecione</option>');
            for (i = 0; i < data.count; i++) {
                $('select[name=selectAtividade]').append('<option value="' + data.body[i].emaidEmpresaAtividade + '">' + data.body[i].emaNome + '</option>');
            }


        }, error: function (result) {
            console.log(result);
        }
    });
}
