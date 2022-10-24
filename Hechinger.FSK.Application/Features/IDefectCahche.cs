namespace Hechinger.FSK.Application.Features
{
    public interface IDefectCahche
    {
        void AddCache(DefectModel[] defects, string key);
        DefectModel[] GetCachedDefects();
        void ResetCache();
    }
}