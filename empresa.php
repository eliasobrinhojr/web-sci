<!DOCTYPE html>

<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Empresa</title>



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

            tr:hover {
                cursor: pointer;
                background: #808080 !important;
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
                        <li class="breadcrumb-item active">Empresas</li>
                    </ol>



                    <div class="container">
                        <!-- Large modal -->
                        <!--                        <div class="container mt-5">
                                                    <button class="btn btn-success btn-block btn-lg" id="modalToggle">Launch the modal</button>
                                                </div>-->


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
                                                <a class="nav-link active" data-toggle="tab" href="#infoPanel" role="tab">Informações</a>
                                            <li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#ads" role="tab">Responsável</a>
                                            <li>

                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#schedulePanel" role="tab">Logradouro</a>
                                            <li>

                                        </ul>

                                        <div class="tab-content mt-2">

                                            <div class="tab-pane fade show active" id="infoPanel" role="tabpanel">
                                                <br>
                                                <h4>Informações</h4>
                                                <div class="form-group">
                                                    <div class="form-row">

                                                        <div class="col-md-6">
                                                            <div class="form-label-group">
                                                                <input type="hidden" id="idEmp">
                                                                <input type="text" id="cnpj" name="cnpj" class="form-control" placeholder="CNPJ" autofocus="autofocus">
                                                                <label for="cnpj">CNPJ</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-label-group">
                                                                <input type="text" id="inscrMunicipal" class="form-control" placeholder="Inscrição Municipal" required="required">
                                                                <label for="inscrMunicipal">Inscrição Municipal</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="form-label-group">
                                                        <input type="text" id="razaoSocial" class="form-control" placeholder="Razão Social" required="required">
                                                        <label for="razaoSocial">Razão Social</label>
                                                    </div>
                                                    <br>

                                                    <div class="form-group">
                                                        <div class="form-row">
                                                            <div class="col-md-6">
                                                                <label for="Atividade">Atividade</label>
                                                                <select required id="selectAtividade" name="selectAtividade" class="form-control">
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>

                                                <hr>
                                                <button class="btn btn-secondary" id="infoContinue">Continuar</button>
                                            </div>

                                            <div class="tab-pane fade" id="ads" role="tabpanel">
                                                <br>
                                                <h4>Responsável</h4>
                                                <div class="form-group">
                                                    <div class="form-row">

                                                        <div class="col-md-3">
                                                            <label for="">&nbsp;</label>

                                                            <div class="form-label-group">
                                                                <input type="text" id="respnome" class="form-control" placeholder="Nome" required="required">
                                                                <label for="nome">Nome</label>
                                                            </div>

                                                        </div>
                                                        <div class="col-md-3">
                                                            <label for="">&nbsp;</label>                                        
                                                            <div class="form-label-group">
                                                                <input type="text" id="respcpf" class="form-control" placeholder="CPF" required="required">
                                                                <label for="cpf">CPF</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                                <button class="btn btn-secondary" id="respContinue">Continuar</button>
                                            </div>

                                            <div class="tab-pane fade" id="schedulePanel" role="tabpanel">
                                                <br><h4>Endereço</h4>
                                                <div id="scheduleAccordion" class="mb-3" role="tablist" aria-multiselectable="true">

                                                    <div class="form-group">
                                                        <div class="form-row">

                                                            <div class="col-md-6">
                                                                <label for="">Cidade</label>

                                                                <input id="logcidade" type="text" class="form-control typeahead" data-provide="typeahead">
                                                            </div>

                                                            <div class="col-md-6">
                                                                <label for="">&nbsp;</label>
                                                                <div class="form-label-group">
                                                                    <input id="logLogradouro" type="text" class="form-control" data-provide="typeahead">
                                                                    <label for="lognome">Logradouro</label>
                                                                </div>

                                                            </div>


                                                        </div>
                                                    </div>  

                                                    <div class="form-group">
                                                        <div class="form-row">
                                                            <div class="col-md-6">
                                                                <label for="">&nbsp;</label>   
                                                                <div class="form-label-group">
                                                                    <input type="number" id="endNumero" class="form-control" placeholder="Endereço Número" required="required">
                                                                    <label for="endNumero">Número</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label for="">&nbsp;</label>   
                                                                <div class="form-label-group">
                                                                    <input type="text" id="empcomplemento" class="form-control" placeholder="Complemento" required="required">
                                                                    <label for="complemento">Complemento</label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <hr>
                                                <button class="btn btn-secondary" id="activate">Salvar</button>

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



                    <hr>
                    <!-- DataTables Example -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-table"></i>
                            <label id="lbEmpresas">Empresas</label></div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="table_empresas" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>

                                            <th>cdemp</th>
                                            <th>cdcgc</th>
                                            <th>cdmun</th>
                                            <th>dsemp</th>
                                            <th>ativi</th>
                                            <th>cdcep</th>
                                            <th>cdtri</th>
                                            <th>compr</th>
                                            <th>ender</th>
                                            <th>nfts_sp</th>
                                            <th>cdsynchro</th>
                                            <th>resp_cpf</th>
                                            <th>responsavel</th>
                                            <th>uf</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>cdemp</th>
                                            <th>cdcgc</th>
                                            <th>cdmun</th>
                                            <th>dsemp</th>
                                            <th>ativi</th>
                                            <th>cdcep</th>
                                            <th>cdtri</th>
                                            <th>compr</th>
                                            <th>ender</th>
                                            <th>nfts_sp</th>
                                            <th>cdsynchro</th>
                                            <th>resp_cpf</th>
                                            <th>responsavel</th>
                                            <th>uf</th>
                                        </tr>
                                    </tfoot>
                                    <tbody id="linhas_empresa">


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-footer small text-muted">Atualizado hoje às <?php echo date("H:i:s"); ?> </div>
                    </div>

                    <p class="small text-center text-muted my-5">
                        <em>More table examples coming soon...</em>
                    </p>

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
        <!-- JS file --> 
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>



        <script src="js/typeahead.js"></script>
        <script src="js/typeahead.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <!-- Page level plugin JavaScript-->

        <script src="vendor/datatables/jquery.dataTables.js"></script>
        <script src="vendor/datatables/dataTables.bootstrap4.js"></script>

        <!-- Custom scripts for all pascheduleContinueges-->
        <script src="js/sb-admin.min.js"></script>

        <!-- Demo scripts for this page-->
        <script src="js/tables/datatables-empresa.js"></script>

        <script src="js/funcoes/empresa.js"></script>


    </body>

</html>