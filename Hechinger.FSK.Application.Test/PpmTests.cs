

namespace Hechinger.FSK.Application.Test
{
    public class PpmTests
    {
        private IQualityService _qualityService;
        [SetUp]
        public void Setup()
        {
            this._qualityService = new QualityService();
        }


        [Test]
        public void TestPpmValue()
        {
            var result = _qualityService.GetPpm(1000000, 1);
            Assert.AreEqual(result, 1);
        }
    }
}
