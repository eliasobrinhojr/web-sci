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


            if ($('#forTipo').val() == 'F') {
                if ($("#cpfcnpj").val().trim() == '') {
                    msg += '\nCPF Obrigatório\n';
                } else if (!validaCPF($("#cpfcnpj").val().trim())) {
                    msg += '\nCPF Inválido\n';
                } else {
                    $('.progress-bar').css('width', '60%');
                    $('.progress-bar').html('Passo 2 de 3');
                    $('#myTab a[href="#schedulePanel"]').tab('show');
                }
            } else {
                if ($("#cpfcnpj").val().trim() == '') {
                    msg += '\nCNPJ Obrigatório\n';
                } else if (!valida_cnpj($("#cpfcnpj").val().trim())) {
                    msg += '\nCNPJ Inválido\n';
                } else {
                    $('.progress-bar').css('width', '60%');
                    $('.progress-bar').html('Passo 2 de 3');
                    $('#myTab a[href="#schedulePanel"]').tab('show');
                }
            }


            if (msg != '') {
                alert(msg);
            }
            msg = '';
        });


        $('#logBack').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '40%');
            $('.progress-bar').html('Passo 2 de 3');
            $('#myTab a[href="#infoPanel"]').tab('show');

        });
        $('#activate').click(function (e) {
            e.preventDefault();

            alert('salvar');

        });
    });
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

