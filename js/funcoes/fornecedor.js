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

            $('.progress-bar').css('width', '60%');
            $('.progress-bar').html('Passo 2 de 3');
            $('#myTab a[href="#schedulePanel"]').tab('show');

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

        if ($('#forTipo').val() == 'F') {
            $(this).val(
                    $(this).val()
                    .replace(/\D/g, '')
                    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));

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
            $(this).val(
                    $(this).val()
                    .replace(/\D/g, '')
                    .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5"));
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

}

