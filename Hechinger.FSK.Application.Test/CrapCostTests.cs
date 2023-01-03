using Hechinger.FSK.Application.Features;
using NUnit.Framework;

namespace Hechinger.FSK.Application.Test
{
    public class CrapCostTests
    {
        private IQualityService _qualityService;
        [SetUp]
        public void Setup()
        {
            this._qualityService = new QualityService();  
        }

        [Test]
        public void TestCrapCostValue()
        {
            var result = _qualityService.CrapCost(9.39, 10);
            Assert.AreEqual(result, 18.78);
        }
        [Test]
        public void TestPpmValue()
        {
            var result = _qualityService.GetPpm(1000000, 1);
            Assert.AreEqual(result,1);
        }
    }
}