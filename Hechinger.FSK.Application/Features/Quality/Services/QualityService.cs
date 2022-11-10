namespace Hechinger.FSK.Application
{

    public class QualityService : IQualityService
    {
        public readonly int PPM = 1000000;
        public int GetPPM(int sumQuantity, int fehlerQuantity)
        {
            return sumQuantity != 0 ? (PPM / sumQuantity) * fehlerQuantity : 0;
        }

        public int CrapCost(int operationTime, int fehlerQuantity)
        {
            return operationTime != 0 ? (PPM / operationTime) * fehlerQuantity : 0;
        }
    }
}
