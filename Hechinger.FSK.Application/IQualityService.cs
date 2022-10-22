namespace Hechinger.FSK.Application
{
    public interface IQualityService
    {
        int GetPPM(int sumQuantity, int fehlerQuantity);
        int CrapCost(int operationTime, int fehlerQuantity)
    }
}