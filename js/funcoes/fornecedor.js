$(document).ready(function () {
    init();
});
function init() {
    configuraTabs();
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
            $('#myTab a[href="#ads"]').tab('show');

        });
        $('#respBack').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '20%');
            $('.progress-bar').html('Passo 1 de 3');
            $('#myTab a[href="#infoPanel"]').tab('show');

        });
        $('#respContinue').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '100%');
            $('.progress-bar').html('Passo 3 de 3');
            $('#myTab a[href="#schedulePanel"]').tab('show');

        });

        $('#logBack').click(function (e) {
            e.preventDefault();

            $('.progress-bar').css('width', '40%');
            $('.progress-bar').html('Passo 2 de 3');
            $('#myTab a[href="#ads"]').tab('show');

        });
        $('#activate').click(function (e) {
            e.preventDefault();

            alert('salvar');

        });
    });
}

