<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Dashboard</title>

        <!-- Bootstrap core CSS-->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom fonts for this template-->
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

        <!-- Page level plugin CSS-->
        <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">

        <!-- Custom styles for this template-->
        <link href="css/sb-admin.css" rel="stylesheet">

        <style>
            th { font-size: 13px; }
            td { font-size: 12px; }

            tbody > tr:hover {
                cursor: pointer;
                background: #808080 !important;
            }

            .loader {
                border: 4px solid #f3f3f3; /* Light grey */
                border-top: 4px solid #3498db; /* Blue */
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 2s linear infinite;
            }

            .loaderError {
                border: 4px solid #ff0000; /* Red */
                border-radius: 100%;
                width: 30px;
                height: 30px;
            }

            .loaderSuccess {
                border: 4px solid #00ff00; /* green */
                border-radius: 100%;
                width: 30px;
                height: 30px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }


        </style>

    </head>

    <body id="page-top">

        <?php include('corpo/navbar.php'); ?>

        <div id="wrapper">

            <!-- Sidebar -->

            <?php include('corpo/sidebar.php'); ?>

            <div id="content-wrapper">

                <div class="container-fluid">

                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>

                        </li>
                        <li class="breadcrumb-item active">Fornecedores</li>
                    </ol>

                    <div class="container">

                        <div id="modal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="wizard-title">Formulário Empresa</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active"  href="#infoPanel" role="tab"><b>Informações</b></a>
                                            <li>

                                            <li class="nav-item">
                                                <a class="nav-link" href="#schedulePanel" role="tab"><b>Endereço</b></a>
                                            <li>

                                        </ul>

                                        <div class="tab-content mt-2">

                                            <div class="tab-pane fade show active" id="infoPanel" role="tabpanel">
                                                <hr>

                                                <div class="form-group">
                                                    <div class="form-row">

                                                        <div class="col-md-6"> 
                                                            <div class="form-label-group">
                                                                <input type="hidden" name="forTipo" id="forTipo"/>
                                                                <input type="text" id="cpfcnpj" name="cpfcnpj" maxlength="18" class="form-control" autofocus="autofocus">
                                                                <label id="lbcpfcnpj" for="cpfcnpj">CPF ou CNPJ</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="form-row">

                                                        <div class="col-md-6">
                                                            <label for="">&nbsp;</label>

                                                            <div class="form-label-group">
                                                                <input type="text" id="inss" class="form-control" placeholder="INSS">
                                                                <label for="inss">INSS</label>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                                <hr>
                                                <button class="btn btn-primary" id="infoContinue">Continuar</button>
                                            </div>


                                            <div class="tab-pane fade" id="schedulePanel" role="tabpanel">
                                                <hr>
                                                <div id="scheduleAccordion" class="mb-3" role="tablist" aria-multiselectable="true">

                                                    <div class="form-group">
                                                        <div class="form-row">

                                                            <div class="col-md-6">
                                                                <label for="">CEP</label>

                                                                <input id="logCep" type="text"  class="form-control" maxlength="10" /> 
                                                            </div>

                                                            <div class="col-md-6">
                                                                <h6 id="lbAlertCep">Buscando</h6>
                                                                <div class="form-label-group">
                                                                    <div id="divLoad"></div> 
                                                                </div>

                                                            </div>


                                                        </div>
                                                    </div>  
                                                    <div class="form-group">
                                                        <div class="form-row">

                                                            <div class="col-md-6">
                                                                <label for="">Cidade</label>

                                                                <select id="selectCidade" name="selectCidade" type="text" class="form-control" >

                                                                </select>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <label for="">Logradouro</label>
                                                                <div class="form-label-group">
                                                                    <select id="selectLogradouro" name="selectLogradouro" type="text" class="form-control">

                                                                    </select>
                                                                </div>

                                                            </div>


                                                        </div>
                                                    </div>  

                                                    <div class="form-group">
                                                        <div class="form-row">
                                                            <div class="col-md-6">
                                                                <label for="">&nbsp;</label>   
                                                                <div class="form-label-group">
                                                                    <input type="number" id="endNumero" class="form-control"  placeholder="Endereço Número" >
                                                                    <label for="endNumero">Número</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label for="">&nbsp;</label>   
                                                                <div class="form-label-group">
                                                                    <input type="text" id="forcomplemento" class="form-control" placeholder="Complemento" >
                                                                    <label for="forcomplemento">Complemento</label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <hr>
                                                <button class="btn btn-secondary" id="logBack">Voltar</button>
                                                <button class="btn btn-primary" id="activate">Salvar</button>

                                            </div>

                                        </div>
                                        <div class="progress mt-5">
                                            <div class="progress-bar" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Passo 1 de 3</div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        SSP
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <i class="fas fa-table"></i>
                                            <label id="lbPrestadores">Prestadores SSP</label></div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered" id="table_prestadores" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>cdpre</th>
                                                            <th>cdirf</th>
                                                            <th>idpre</th>
                                                            <th>cdcgc</th>
                                                            <th>cdmun</th>
                                                            <th>dspre</th>
                                                            <th>ender</th>
                                                            <th>cdcep</th>
                                                            <th>ctadi</th>
                                                            <th>ctiss</th>
                                                            <th>ctirf</th>
                                                            <th>ctgps</th>
                                                            <th>ctdesc</th>
                                                            <th>ctjur</th>
                                                            <th>nmpre</th>
                                                            <th>stpre</th>
                                                            <th>cdemp</th>
                                                            <th>cdcent</th>
                                                            <th>inscgps</th>
                                                            <th>ctpcc</th>
                                                            <th>ctcof</th>
                                                            <th>ctpis</th>
                                                            <th>ctcsl</th>
                                                            <th>flinscprefsp</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                        <tr>
                                                            <th>cdpre</th>
                                                            <th>cdirf</th>
                                                            <th>idpre</th>
                                                            <th>cdcgc</th>
                                                            <th>cdmun</th>
                                                            <th>dspre</th>
                                                            <th>ender</th>
                                                            <th>cdcep</th>
                                                            <th>ctadi</th>
                                                            <th>ctiss</th>
                                                            <th>ctirf</th>
                                                            <th>ctgps</th>
                                                            <th>ctdesc</th>
                                                            <th>ctjur</th>
                                                            <th>nmpre</th>
                                                            <th>stpre</th>
                                                            <th>cdemp</th>
                                                            <th>cdcent</th>
                                                            <th>inscgps</th>
                                                            <th>ctpcc</th>
                                                            <th>ctcof</th>
                                                            <th>ctpis</th>
                                                            <th>ctcsl</th>
                                                            <th>flinscprefsp</th>
                                                        </tr>
                                                    </tfoot>
                                                    <tbody>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="card-footer small text-muted">Atualizado hoje às <?php echo date("H:i:s"); ?> </div>
                                    </div>   
                                </div>
                            </div>
                        </div> <hr>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        CASS
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div class="card-body">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <i class="fas fa-table"></i>
                                            <label id="lbFornecedores">Fornecedores CASS</label></div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered" id="table_fornecedores" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>forcod</th>
                                                            <th>forpjf</th>
                                                            <th>forcnpjcpf</th>
                                                            <th>forbai</th>
                                                            <th>fornome</th>
                                                            <th>formun</th>
                                                            <th>forend</th>
                                                            <th>forcep</th>
                                                            <th>foruf</th>
                                                            <th>forfone</th>
                                                            <th>forfax</th>
                                                            <th>foremail</th>
                                                            <th>esrcod</th>
                                                            <th>fornum</th>
                                                            <th>muncod</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                        <tr>
                                                            <th>forcod</th>
                                                            <th>forpjf</th>
                                                            <th>forcnpjcpf</th>
                                                            <th>forbai</th>
                                                            <th>fornome</th>
                                                            <th>formun</th>
                                                            <th>forend</th>
                                                            <th>forcep</th>
                                                            <th>foruf</th>
                                                            <th>forfone</th>
                                                            <th>forfax</th>
                                                            <th>foremail</th>
                                                            <th>esrcod</th>
                                                            <th>fornum</th>
                                                            <th>muncod</th>
                                                        </tr>
                                                    </tfoot>
                                                    <tbody>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="card-footer small text-muted">Atualizado hoje às <?php echo date("H:i:s"); ?> </div>
                                    </div>   
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr>



                </div>


                <?php include('corpo/footer.php'); ?>

            </div>
            <!-- /.content-wrapper -->

        </div>
        <!-- /#wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <?php include('corpo/logout-modal.php'); ?>

        <!-- Bootstrap core JavaScript-->
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <!-- Page level plugin JavaScript-->
        <script src="vendor/datatables/jquery.dataTables.js"></script>
        <script src="vendor/datatables/dataTables.bootstrap4.js"></script>

        <!-- Custom scripts for all pages-->
        <script src="js/sb-admin.min.js"></script>

        <!-- Demo scripts for this page-->
        <script src="js/funcoes/validarCnpjCpfCep.js"></script>
        <script src="js/tables/datatables-prestador.js"></script>
        <script src="js/tables/datatables-fornecedor.js"></script>
        <script src="js/funcoes/fornecedor.js"></script>
    </body>

</html>