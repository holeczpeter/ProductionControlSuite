namespace Hechinger.FSK.Application
{

    public class QualityService : IQualityService
    {
        public readonly int PPM = 1000000;
        public int GetPPM(int sumQuantity, int fehlerQuantity)
        {
            return (PPM / sumQuantity) * fehlerQuantity;
        }

        public int CrapCost(int operationTime, int fehlerQuantity)
        {
            return (PPM / operationTime) * fehlerQuantity;
        }
    }
}
