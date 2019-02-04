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
            $('.progress-bar').html('Passo 2 de 4');


            $('#myTab a[href="#ads"]').tab('show');
        });
        $('#respContinue').click(function (e) {
            e.preventDefault();
            $('.progress-bar').css('width', '60%');
            $('.progress-bar').html('Passo 3 de 4');
            $('#myTab a[href="#schedulePanel"]').tab('show');
        });
//        $('#endContinue').click(function (e) {
//            e.preventDefault();
//            $('.progress-bar').css('width', '80%');
//            $('.progress-bar').html('Step 4 of 5');
//            $('#myTab a[href="#schedulePanel"]').tab('show');
//        });
        $('#logContinue').click(function (e) {
            e.preventDefault();
            $('.progress-bar').css('width', '100%');
            $('.progress-bar').html('Passo 4 de 4');
            $('#myTab a[href="#reviewPanel"]').tab('show');
        });
        $('#activate').click(function (e) {
            e.preventDefault();

            var id_cidade = $(".typeahead").typeahead("getActive").id;
            var obj = {cnpj: $('#cnpj').val(),
                inscMunicipal: $('#inscrMunicipal').val(),
                razaoSocial: $('#razaoSocial').val(),
                id_atividade: $('#selectAtividade').val(),
                numero: $('#endNumero').val(),
                complemento: $('#empcomplemento').val(),
                respNome: $('#respnome').val(),
                respCpf: $('#respcpf').val(),
                logNome: $('#lognome').val(),
                logCidade: id_cidade,
                logCep: $('#logcep').val(),
                logComplemento: $('#logcomplemento').val()
            };

            console.log(obj);
            alert(JSON.stringify(obj));
        });
    });
}
);

function init() {
    carregaComboEmpresaAtividade();
    configuraAutocomplete();
}

function configuraAutocomplete() {

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



