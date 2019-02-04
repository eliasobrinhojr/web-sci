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
    configuraAutocomplete();
}

function configuraAutocomplete() {
    var $input = $(".typeahead");
    $input.typeahead({
        source: [
            {id: "1", name: "Manaus"},
            {id: "2", name: "Roraima"}
        ],
        autoSelect: true
    });
    $input.change(function () {
        var current = $input.typeahead("getActive");

        if (current) {
            // Some item from your model is active!
            if (current.name == $input.val()) {
                console.log(current.id);
                // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
            } else {
                // This means it is only a partial match, you can either add a new item
                // or take the active if you don't want new items
            }
        } else {
            // Nothing is active so it is a new value (or maybe empty value)
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



