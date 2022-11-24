namespace Hechinger.FSK.Application
{
    public interface IQualityService
    {
        double GetPpm(int quantity, int defectQuantity);
        double CrapCost(double operationTime, int defectQuantity);
    }
}