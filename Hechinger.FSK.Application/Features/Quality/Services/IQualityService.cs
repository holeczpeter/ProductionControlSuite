namespace Hechinger.FSK.Application
{
    public interface IQualityService
    {
        int GetPpm(int sumQuantity, int fehlerQuantity);
        int CrapCost(int operationTime, int fehlerQuantity);
    }
}