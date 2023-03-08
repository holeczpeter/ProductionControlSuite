namespace Hechinger.FSK.Application.Features
{
    public class SummaryCardImportModel
    {
        //hgyid,"az","Datum","Het","muszak","Dolgozo_kod","Rajzszam","Muveletkod","Gyartott_db","Hibakod","Hiba_db","Hibakategoria","dolg_az","beido","megjegyzes"

        public string hgyid { get; set; }
        public string az { get; set; }
        public string Datum { get; set; }
        public string Het { get; set; }

        public string muszak { get; set; }

        public string Dolgozo_kod { get; set; }

        public string Rajzszam { get; set; }

        public string Muveletkod { get; set; }

        public string Gyartott_db { get; set; }

        public string Hibakod { get; set; }

        public string Hiba_db { get; set; }

        public string Hibakategoria { get; set; }

        public string dolg_az { get; set; }

        public string beido { get; set; }

        public string megjegyzes { get; set; }

        public bool IsSuccess { get; set; }

        public string ErrorText { get; set; }

        public string ErrorObject { get; set; }
    }
}
