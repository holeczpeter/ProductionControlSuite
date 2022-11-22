namespace Hechinger.FSK.Application
{
    public interface IQualityService
    {
        int GetPpm(int sumQuantity, int fehlerQuantity);
        double CrapCost(double operationTime, int fehlerQuantity);
    }
}