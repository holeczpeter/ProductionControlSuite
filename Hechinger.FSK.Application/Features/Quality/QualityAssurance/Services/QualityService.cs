namespace Hechinger.FSK.Application
{

    public class QualityService : IQualityService
    {
        public readonly int Ppm = 1000000;
        public readonly int Euro = 12;
        public int GetPpm(int sumQuantity, int fehlerQuantity)
        {
            return sumQuantity != 0 ? (Ppm / sumQuantity) * fehlerQuantity : 0;
        }

        public double CrapCost(double operationTime, int fehlerQuantity)
        {
            if (fehlerQuantity == 0) return 0;
            var rate = (double)100 / (double)fehlerQuantity;
            var result = (operationTime * ((double)Euro / (double)60)) / rate;
            return Math.Round(result, 2); 
        }
    }
}
