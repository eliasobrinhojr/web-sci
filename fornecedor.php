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
                                            <label id="lbPrestadores">Prestadores SSP</label></div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered" id="table_fornecedores" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>cdpre</th>
                                                            <th>cdirf</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                        <tr>
                                                            <th>cdpre</th>
                                                            <th>cdirf</th>
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
        <script src="js/tables/datatables-prestador.js"></script>
        <script src="js/funcoes/fornecedor.js"></script>
    </body>

</html>