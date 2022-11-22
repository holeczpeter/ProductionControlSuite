namespace Hechinger.FSK.Application
{

    public class QualityService : IQualityService
    {
        public readonly int Ppm = 1000000;
        public int GetPpm(int sumQuantity, int fehlerQuantity)
        {
            return sumQuantity != 0 ? (Ppm / sumQuantity) * fehlerQuantity : 0;
        }

        public double CrapCost(double operationTime, int fehlerQuantity)
        {

            var r = 100 / fehlerQuantity;
            return operationTime != 0 ? (operationTime * 100) / r * 12 : 0;
        }
    }
}
