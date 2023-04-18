namespace ProductionControlSuite.FSK.Application.Features.Import
{
    public class DefectImportModel
    {
        public string Hibakod { get; set; }
        public string Hiba_nev { get; set; }
        public string Nemet_hiba_nev { get; set; }
        public string Hibakategoria { get; set; }
        public string sulyossag { get; set; }
        public string photolink { get; set; }
        public string kataloguskep { get; set; }
        public bool IsSuccess { get; set; }

        public string ErrorText { get; set; }

        public string ErrorObject { get; set; }
    }
}
