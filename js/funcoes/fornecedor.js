$(document).ready(function () {
    init();
});
function init() {
    configuraTabs();
    inputMask();
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


            if ($('#selectEmpresa').val() == 0 || $('#selectEmpresa').val() == null) {
                msg += '\nEmpresa Obrigatória';
            }
            if ($('#forTipo').val() == 'F') {
                if ($("#cpfcnpj").val().trim() == '') {
                    msg += '\nCPF Obrigatório\n';
                } else if (!validaCPF($("#cpfcnpj").val().trim())) {
                    msg += '\nCPF Inválido\n';
                } else {
                    $('.progress-bar').css('width', '50%');
                    $('.progress-bar').html('Passo 1 de 2');
                    $('#myTab a[href="#schedulePanel"]').tab('show');
                }
            } else {
                if ($("#cpfcnpj").val().trim() == '') {
                    msg += '\nCNPJ Obrigatório\n';
                } else if (!valida_cnpj($("#cpfcnpj").val().trim())) {
                    msg += '\nCNPJ Inválido\n';
                }
            }


            if (msg != '') {
                alert(msg);
            } else {
                $('.progress-bar').css('width', '100%');
                $('.progress-bar').html('Passo 2 de 2');
                $('#myTab a[href="#schedulePanel"]').tab('show');
            }
            msg = '';
        });


        $('#logBack').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '50%');
            $('.progress-bar').html('Passo 2 de 2');
            $('#myTab a[href="#infoPanel"]').tab('show');

        });
        $('#activate').click(function (e) {
            e.preventDefault();


            var obj = {
                forCNPJ_CPF: $('#cpfcnpj').val(),
                forTipo: $('#forTipo').val(),
                logIdLogradouro: $('#selectLogradouro').val(),
                forEnderecoComplemento: $('#forcomplemento').val(),
                forEnderecoNumero: $('#endNumero').val(),
                forINSS: $('#inss').val(),
                forNome: $('#forNome').val(),
                id_empresa: $('#selectEmpresa').val()
            };

            insertFornecedor(obj);


        });
    });
}


function carregaComboEmpresa() {
    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/empresa/empresa/read.php?acao=all";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {

            console.log(data);
            $('select[name=selectEmpresa]').append('<option selected disabled value="0">Selecione</option>');
            for (i = 0; i < data.count; i++) {
                $('select[name=selectEmpresa]').append('<option value="' + data.body[i].empidEmpresas + '">' + data.body[i].empRazaoSocial + '</option>');
            }


        }, error: function (result) {
            console.log(result);
        }
    });
}

function insertFornecedor(obj) {
    
    console.log(JSON.stringify(obj));
    
//    var url = "http://dev.grupois.mao/sciweb/ws-sci/service/fornecedor/fornecedor/create.php";
//    $.ajax({
//        type: 'POST',
//        url: url,
//        dataType: 'json',
//        data: JSON.stringify(obj),
//        success: function (data) {
//            alert(data.message);
//
//            $('#modal').modal('hide');
//            $('#selectCidade').html('');
//            $('#selectLogradouro').html('');
//
//
//        }, error: function (result) {
//            console.log(result);
//        }
//    });
}

function inputMask() {

    $("#cpfcnpj").on("keyup", function (e) {

        var valor = $(this).val();
        valor = valor.split(".").join("");
        valor = valor.split("-").join("");
        valor = valor.split("/").join("");

        if ($('#forTipo').val() == 'F') {

            if (valor.length == 11) {
                $(this).val(
                        $(this).val()
                        .replace(/\D/g, '')
                        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));

            } else {
                $(this).val(valor);
            }

            if (!validaCPF($(this).val().trim())) {
                $("#cpfcnpj").css({
                    "border-color": "red"
                });
            } else {
                $("#cpfcnpj").css({
                    "border-color": "green"
                });
            }



        } else if ($('#forTipo').val() == 'J') {

            if (valor.length == 14) {
                $(this).val(
                        $(this).val()
                        .replace(/\D/g, '')
                        .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5"));

            } else {
                $(this).val(valor);
            }
            if (!valida_cnpj($(this).val().trim())) {

                $("#cpfcnpj").css({
                    "border-color": "red"
                });
            } else {
                $("#cpfcnpj").css({
                    "border-color": "green"
                });
            }

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
            cepInvalido();

            $('#selectCidade').prop('disabled', true);
            $('#selectLogradouro').prop('disabled', true);
            $('#selectLogradouro').html('');
            $('#selectCidade').html('');
        }
    });

}

