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



    </head>

    <body id="page-top">

        <?php include('navbar.php'); ?>

        <div id="wrapper">

            <!-- Sidebar -->

            <?php include('sidebar.php'); ?>

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
                        <div class="card">
                            <div class="card-header">Formulário Empresa</div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-label-group">
                                                    <input type="text" id="cnpj" class="form-control" placeholder="CNPJ" required="required" autofocus="autofocus">
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
                                    </div>
                                    <div class="form-group">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-label-group">
                                                    <input type="number" id="endNumero" class="form-control" placeholder="Endereço Número" required="required">
                                                    <label for="endNumero">Endereço Número</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-label-group">
                                                    <input type="text" id="complemento" class="form-control" placeholder="Complemento" required="required">
                                                    <label for="complemento">Complemento</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <label for="Atividade">Atividade</label>
                                                <select id="selectAtividade" name="selectAtividade" class="form-control">
                                                </select>
                                            </div>

                                            <div class="col-md-3">
                                                <label for="responsavel">Responsável</label>

                                                <div class="form-label-group">
                                                    <input type="text" id="nome" class="form-control" placeholder="Nome" required="required">
                                                    <label for="nome">Nome</label>
                                                </div>

                                            </div>
                                            <div class="col-md-3">
                                                <label for="">&nbsp;</label>                                        
                                                <div class="form-label-group">
                                                    <input type="text" id="cpf" class="form-control" placeholder="CPF" required="required">
                                                    <label for="cpf">CPF</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>



                                    <hr>
                                    <div class="form-group">
                                        <div class="form-row">
                                           
                                            <div class="col-md-3">
                                                 <label for="responsavel">Logradouro</label>
                                                 <div class="form-label-group">
                                                    <input type="text" id="lognome" class="form-control" placeholder="Nome" required="required">
                                                    <label for="lognome">Nome</label>
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-3">
                                                 <label for="responsavel">Cidade</label>
                                                 <div class="form-label-group">
                                                     <select class="form-control" id="selectCidade" name="selectCidade"></select>
                                                </div>
                                                
                                            </div>

                                            <div class="col-md-3">
                                               <label for="">&nbsp;</label>
                                                <div class="form-label-group">
                                                    <input type="text" id="cep" class="form-control" placeholder="CEP" required="required">
                                                    <label for="cep">CEP</label>
                                                </div>

                                            </div>
                                            <div class="col-md-3">
                                                <label for="">&nbsp;</label>                                        
                                                <div class="form-label-group">
                                                    <input type="text" id="logcomplemento" class="form-control" placeholder="Complemento" required="required">
                                                    <label for="logcomplemento">Complemento</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <hr>

                                    <div class="form-group">
                                        <div class="form-row">
                                            <div class="col-md-2">
                                                <a class="btn btn-primary btn-block" href="#">Salvar</a>
                                            </div>

                                        </div>
                                    </div>


                                </form>

                            </div>
                        </div>
                    </div>
                    <hr>
                    <!-- DataTables Example -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-table"></i>
                            Empresas</div>
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

                <!-- Sticky Footer -->
                <footer class="sticky-footer">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright © Grupo IS 2019</span>
                        </div>
                    </div>
                </footer>

            </div>
            <!-- /.content-wrapper -->

        </div>
        <!-- /#wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <?php include('logout-modal.php'); ?>


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
        <script src="js/tables/datatables-empresa.js"></script>

        <script src="js/funcoes/empresa.js"></script>

    </body>

</html>