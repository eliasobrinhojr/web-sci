
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

function validarCep(cep) {
    exp = /\d{2}\.\d{3}\-\d{3}/;
    return !exp.test(cep) ? true : false;
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

    console.log(cep);

    if (cep != null) {

        var strCep = cep.replace('.', '');
        strCep = strCep.replace('-', '');

        var url_via_cep = "https://viacep.com.br/ws/" + strCep + "/json/";
        $.ajax({
            type: 'GET',
            url: url_via_cep,
            dataType: 'json',
            success: function (data) {

                if (!data.erro) {
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
                } else {
                    cepInvalido();
                }




            }, error: function (result) {
                console.log(result);
            }
        });
    }
}

function insertLogradouro(obj) {
    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/enderecamento/logradouro/create.php";
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: url,
        data: JSON.stringify(obj),
        success: function (data) {


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

function cepInvalido() {
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
}