$(document).ready(function () {
    init();
});
function init() {
    configuraTabs();
    carregaComboEmpresaAtividade();
    configuraAutocompleteCidade();
    inputMask();

}

function configuraTabs() {
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
            if (!valida_cnpj(obj.cnpj.trim())) {
                msg += '\nCnpj Inválido\n';
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
                msg += '\nCpf Obrigatório\n';
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

            var log_id = $("#logLogradouro");
            var crt = log_id.typeahead("getActive");

            if (validarCep($('#logCep').val())) {
                alert('número cép inválido');
            }

//            if (crt != undefined) {
//
//                var url = "http://dev.grupois.mao/sciweb/ws-sci/service/empresa/create.php";
//                $.ajax({
//                    type: 'post',
//                    dataType: 'json',
//                    url: url,
//                    data: JSON.stringify({
//                        idEmp: $('#idEmp').val(),
//                        cnpj: $('#cnpj').val(),
//                        inscMunicipal: $('#inscrMunicipal').val(),
//                        razaoSocial: $('#razaoSocial').val(),
//                        id_atividade: $('#selectAtividade').val(),
//                        numero: $('#endNumero').val(),
//                        complemento: $('#empcomplemento').val(),
//                        respNome: $('#respnome').val(),
//                        respCpf: $('#respcpf').val(),
//                        logNome: $('#lognome').val(),
//                        logId: crt.id
//                    }),
//                    success: function (dados) {
//                        getDataEmpresas();
//                        $('#modal').modal('hide');
//
//                        alert(dados.message);
//
//                        $("#reviewDiv").css({
//                            display: "none"
//                        });
//                        $("#activate").css({
//                            display: "none"
//                        });
//                    }
//                });
//            } else {
//                alert("Formulário inválido");
//                $('.progress-bar').css('width', '20%');
//                $('.progress-bar').html('Passo 1 de 3');
//                $('#myTab a[href="#infoPanel"]').tab('show');
//            }

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
    });

    $("#respcpf").on("keyup", function (e)
    {
        $(this).val(
                $(this).val()
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));
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
            $("#divLoad").addClass("loader");
        } else if ($(this).val().length < 10) {
            $("#logCep").css({
                "border-color": "red"
            });
            $("#divLoad").removeClass("loader");
        }
    });
}

function validarCep(cep) {
    exp = /\d{2}\.\d{3}\-\d{3}/;
    return !exp.test(cep) ? true : false;
}

function validaCPF(strCPF) {

    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.split(".").join("");
    strCPF = strCPF.split("-").join("");


    if (strCPF == "00000000000")
        return false;

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false;
    return true;
}

function valida_cnpj(valor) {

    valor = valor.toString();
    valor = valor.replace(/[^0-9]/g, '');
    var cnpj_original = valor;
    var primeiros_numeros_cnpj = valor.substr(0, 12);
    var primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);
    var segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);
    var cnpj = segundo_calculo;


    if (cnpj === cnpj_original) {
        return true;
    }
    return false;

}

function calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {

    digitos = digitos.toString();

    // Faz a soma dos dígitos com a posição
    // Ex. para 10 posições:
    //   0    2    5    4    6    2    8    8   4
    // x10   x9   x8   x7   x6   x5   x4   x3  x2
    //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
    for (var i = 0; i < digitos.length; i++) {

        soma_digitos = soma_digitos + (digitos[i] * posicoes);
        posicoes--;
        // Parte específica para CNPJ
        // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
        if (posicoes < 2) {
            posicoes = 9;
        }
    }
    // Captura o resto da divisão entre soma_digitos dividido por 11
    // Ex.: 196 % 11 = 9
    soma_digitos = soma_digitos % 11;

    // Verifica se soma_digitos é menor que 2
    if (soma_digitos < 2) {
        // soma_digitos agora será zero
        soma_digitos = 0;
    } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        // Ex.: 11 - 9 = 2
        // Nosso dígito procurado é 2
        soma_digitos = 11 - soma_digitos;
    }

    // Concatena mais um dígito aos primeiro nove dígitos
    // Ex.: 025462884 + 2 = 0254628842
    var cpf = digitos + soma_digitos;
    return cpf;

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



