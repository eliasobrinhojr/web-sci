$(document).ready(function () {
    init();

    $("#logCidade").on('keyup', function (e) {
//        console.log($("#logCidade").val().length);
        var cidadesFiltrada = ["blue", "green", "pink", "red", "yellow"];

        var url_local = "http://dev.grupois.mao/sciweb/ws-sci/service/cidade/read.php?strCidade=";
       
        if ($("#logCidade").val().length > 3) {
            $.ajax({
                type: 'GET',
                url: url_local + $("#logCidade").val(),
                dataType: 'json',
                success: function (data) {
                    
                    console.log(data);
                    configuraAutoComplete(cidadesFiltrada);
                }, error: function (result) {
                    console.log(result);
                }
            });
        }


        //requisicao ajax e qnd retornar
        
    });

    $(function () {
        $('#modalToggle').click(function () {
            $('#modal').modal({
                backdrop: 'static'
            });
        });

        $('#infoContinue').click(function (e) {
            e.preventDefault();
            $('.progress-bar').css('width', '40%');
            $('.progress-bar').html('Step 2 of 5');
            $('#myTab a[href="#ads"]').tab('show');
        });

        $('#adsContinue').click(function (e) {
            e.preventDefault();
            $('.progress-bar').css('width', '60%');
            $('.progress-bar').html('Step 3 of 5');
            $('#myTab a[href="#placementPanel"]').tab('show');
        });

        $('#placementContinue').click(function (e) {
            e.preventDefault();
            $('.progress-bar').css('width', '80%');
            $('.progress-bar').html('Step 4 of 5');
            $('#myTab a[href="#schedulePanel"]').tab('show');
        });

        $('#scheduleContinue').click(function (e) {
            e.preventDefault();
            $('.progress-bar').css('width', '100%');
            $('.progress-bar').html('Step 5 of 5');
            $('#myTab a[href="#reviewPanel"]').tab('show');
        });

        $('#activate').click(function (e) {
            e.preventDefault();
            var formData = {
                campaign_name: $('#campaignName').val(),
                start_date: $('#start-date').val(),
                end_date: $('#end-date').val(),
                days: {
                    sunday: $('#sunday').prop('checked'),
                    monday: $('#monday').prop('checked'),
                    tuesday: $('#tuesday').prop('checked'),
                    wednesday: $('#wednesday').prop('checked'),
                    thurday: $('#thursday').prop('checked'),
                    friday: $('#friday').prop('checked'),
                    saturday: $('#saturday').prop('checked')
                },
                start_time: $('#start-time').val(),
                end_time: $('#end-time').val()
            };
            alert(JSON.stringify(formData));
        });
    });

});

function init() {
    carregaComboEmpresaAtividade();
}

function configuraAutoComplete(arr) {

    var options = {
        data: arr
    };

    $("#logCidade").easyAutocomplete(options);

    document.getElementsByClassName('easy-autocomplete')[0].style.width = '100%';
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



