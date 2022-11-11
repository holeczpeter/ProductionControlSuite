namespace Hechinger.FSK.Application
{

    public class QualityService : IQualityService
    {
        public readonly int Ppm = 1000000;
        public int GetPpm(int sumQuantity, int fehlerQuantity)
        {
            return sumQuantity != 0 ? (Ppm / sumQuantity) * fehlerQuantity : 0;
        }

        public int CrapCost(int operationTime, int fehlerQuantity)
        {
            return operationTime != 0 ? (Ppm / operationTime) * fehlerQuantity : 0;
        }
    }
}
