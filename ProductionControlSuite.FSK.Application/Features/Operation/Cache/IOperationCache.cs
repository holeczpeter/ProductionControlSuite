namespace ProductionControlSuite.FSK.Application
{

    public interface IOperationCache
    {
        void AddCache(OperationModel[] workingDays, string key);
        OperationModel[] GetCachedOperations();
        void ResetCache();
    }
}
