namespace ProductionControlSuite.FSK.Application
{

    public class QualityService : IQualityService
    {
        public readonly int Ppm = 1000000;
        public readonly int Euro = 12;
        public double GetPpm(int quantity, int defectQuantity)
        {
            return quantity != 0 ? Math.Ceiling((Ppm / Convert.ToDouble(quantity)) * Convert.ToDouble(defectQuantity)) : 0;
        }

        public double CrapCost(double operationTime, int defectQuantity)
        {
            if (defectQuantity == 0) return 0;
            var rate = (double)100 / (double)defectQuantity;
            var result = (operationTime * ((double)Euro / (double)60)) / rate;
            return Math.Round(result, 2); 
        }
    }
}
