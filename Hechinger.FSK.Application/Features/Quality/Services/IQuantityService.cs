﻿
namespace Hechinger.FSK.Application.Features
{
    public interface IQuantityService
    {
        Task<IEnumerable<QuantityOperationReportModel>> Get(int productId, DateTime start, DateTime end, CancellationToken cancellationToken);
    }
}