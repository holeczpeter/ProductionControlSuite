using Hechinger.FSK.Application.Features;
using System.Linq.Expressions;
using System.Reflection;

namespace Hechinger.FSK.Application.Common
{

    public static class RequestParameterExtensions
    {
        public static double GetTotalPages(this RequestParameters queryParameters, int totalCount)
        {
            return Math.Ceiling(totalCount / (double)queryParameters.PageCount);
        }
        public static bool HasProperty(this object obj, string propertyName)
        {
            return obj.GetType().GetProperty(propertyName) != null;
        }
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> query, string memberName, bool isAsc)
        {
           
            if (memberName == null) memberName = "id";
            var isExistProperty = typeof(T).HasProperty(memberName);
            if (!isExistProperty) memberName = "id";

            ParameterExpression[] typeParams = new ParameterExpression[] { Expression.Parameter(typeof(T), "") };
            System.Reflection.PropertyInfo pi = typeof(T).GetProperty(memberName,
                BindingFlags.Instance |
                BindingFlags.Public |
                BindingFlags.IgnoreCase);
            var order = isAsc ? "OrderBy" : "OrderByDescending";
       
            return (IOrderedQueryable<T>)query.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable),
                    order,
                    new Type[] { typeof(T), pi.PropertyType },
                    query.Expression,
                    Expression.Lambda(Expression.Property(typeParams[0], pi), typeParams))
            );
        }
        public static IQueryable<ProductModel> FilterProduct(this IQueryable<ProductModel> query, ProductRequestParameters queryParameters)
        {
            Expression<Func<ProductModel, bool>> exp = x =>
                          (x.Code.StartsWith(queryParameters.Code) || string.IsNullOrEmpty(queryParameters.Code)) &&
                          (x.Name.StartsWith(queryParameters.Name) || string.IsNullOrEmpty(queryParameters.Name)) &&
                          (x.TranslatedName.StartsWith(queryParameters.TranslatedName) || string.IsNullOrEmpty(queryParameters.TranslatedName)) &&
                          (x.OperationsCount.ToString() == queryParameters.OperationsCount || string.IsNullOrEmpty(queryParameters.OperationsCount)) &&
                          (x.WorkshopName.StartsWith(queryParameters.WorkshopName) || string.IsNullOrEmpty(queryParameters.WorkshopName));
            var filtered = query.Where(exp);

            if (!string.IsNullOrEmpty(queryParameters.StatusName))
            {
                var currentStatusFilter = (queryParameters.StatusName) switch
                {
                    var x when (EntityStatuses.Active.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.Active,
                    var x when (EntityStatuses.Deleted.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.Deleted,
                    var x when (EntityStatuses.InActive.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.InActive,
                    _ => -1,
                };
                Expression<Func<ProductModel, bool>> exp2 = x => ((int)x.Status == currentStatusFilter);
                filtered = filtered.Where(exp2);

            }
            return filtered;
        }
        public static IQueryable<OperationModel> FilterOperation(this IQueryable<OperationModel> query, OperationRequestParameters queryParameters)
        {
            Expression<Func<OperationModel, bool>> exp = x =>
                          (x.Code.StartsWith(queryParameters.Code) || string.IsNullOrEmpty(queryParameters.Code)) &&
                          (x.Name.StartsWith(queryParameters.Name) || string.IsNullOrEmpty(queryParameters.Name)) &&
                          (x.TranslatedName.StartsWith(queryParameters.TranslatedName) || string.IsNullOrEmpty(queryParameters.TranslatedName)) &&
                          (x.ProductName.StartsWith(queryParameters.ProductName) || string.IsNullOrEmpty(queryParameters.ProductName)) &&
                          (x.OperationTime.ToString().StartsWith(queryParameters.OperationTime) || string.IsNullOrEmpty(queryParameters.OperationTime)) &&
                          (x.Norma.ToString().StartsWith(queryParameters.Norma) || string.IsNullOrEmpty(queryParameters.Norma)) &&
                          (x.DefectsCount.ToString() == queryParameters.DefectsCount || string.IsNullOrEmpty(queryParameters.DefectsCount)) &&
                          (x.ProductTranslatedName.StartsWith(queryParameters.ProductTranslatedName) || string.IsNullOrEmpty(queryParameters.ProductTranslatedName)) &&
                          (x.ProductCode.StartsWith(queryParameters.ProductCode) || string.IsNullOrEmpty(queryParameters.ProductCode));

            var filtered = query.Where(exp);

            if (!string.IsNullOrEmpty(queryParameters.StatusName))
            {
                var currentStatusFilter = (queryParameters.StatusName) switch
                {
                    var x when (EntityStatuses.Active.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.Active,
                    var x when (EntityStatuses.Deleted.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.Deleted,
                    var x when (EntityStatuses.InActive.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.InActive,
                    _ => -1,
                };

                Expression<Func<OperationModel, bool>> exp2 = x => ((int)x.Status == currentStatusFilter);
                filtered = filtered.Where(exp2);
            }
            return filtered;
        }
        public static IQueryable<DefectModel> FilterDefect(this IQueryable<DefectModel> query, DefectRequestParameters queryParameters)
        {
            Expression<Func<DefectModel, bool>> exp = x =>
                         (x.Code.StartsWith(queryParameters.Code) || string.IsNullOrEmpty(queryParameters.Code)) &&
                         (x.Name.StartsWith(queryParameters.Name) || string.IsNullOrEmpty(queryParameters.Name)) &&
                         (x.TranslatedName.StartsWith(queryParameters.TranslatedName) || string.IsNullOrEmpty(queryParameters.TranslatedName)) &&
                         (x.OperationCode.StartsWith(queryParameters.OperationCode) || string.IsNullOrEmpty(queryParameters.OperationCode)) &&
                         (x.OperationName.StartsWith(queryParameters.OperationName) || string.IsNullOrEmpty(queryParameters.OperationName)) &&
                         (x.OperationTranslatedName.StartsWith(queryParameters.OperationTranslatedName) || string.IsNullOrEmpty(queryParameters.OperationTranslatedName));
            var filtered = query.Where(exp);
 
            if (!string.IsNullOrEmpty(queryParameters.DefectCategoryName))
            {
                var currentCategoryFilter = (queryParameters.DefectCategoryName) switch
                {
                    var x when (DefectCategories.F0.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)DefectCategories.F0,
                    var x when (DefectCategories.F1.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)DefectCategories.F1,
                    var x when (DefectCategories.F2.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)DefectCategories.F2,
                    _ => -1,
                };
                Expression<Func<DefectModel, bool>> exp2 = x => ((int)x.DefectCategory == currentCategoryFilter);
                filtered = filtered.Where(exp2);
            }
            if (!string.IsNullOrEmpty(queryParameters.StatusName))
            {
                var currentStatusFilter = (queryParameters.StatusName) switch
                {
                    var x when (EntityStatuses.Active.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.Active,
                    var x when (EntityStatuses.Deleted.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.Deleted,
                    var x when (EntityStatuses.InActive.GetDescription().ToUpper().StartsWith(x.ToUpper())) => (int)EntityStatuses.InActive,
                    _ => -1,
                };
                Expression<Func<DefectModel, bool>> exp3 = x => ((int)x.Status == currentStatusFilter);
                filtered = filtered.Where(exp3);
               
            }
            return filtered;
        }

        public static IQueryable<SummaryCardModel> FilterSummaryCard(this IQueryable<SummaryCardModel> query, SummaryCardRequestParameters queryParameters)
        {
            Expression<Func<SummaryCardModel, bool>> exp;
            var isDate = queryParameters.Date != null;
            var isCreated = queryParameters.Created != null;
            exp = (isDate, isCreated) switch
            {
                var x when
                    x == (true, true) => exp = x =>
                         (x.Created.Date == queryParameters.Created.Value.Date) &&
                         (x.Date.Date == queryParameters.Date.Value.Date) &&
                         (x.UserName.StartsWith(queryParameters.UserName) || string.IsNullOrEmpty(queryParameters.UserName)) &&
                         (x.OperationCode.StartsWith(queryParameters.OperationCode) || string.IsNullOrEmpty(queryParameters.OperationCode)) &&
                         (x.OperationName.StartsWith(queryParameters.OperationName) || string.IsNullOrEmpty(queryParameters.OperationName)) &&
                         (x.ShiftName.StartsWith(queryParameters.ShiftName) || string.IsNullOrEmpty(queryParameters.ShiftName)) &&
                         (x.Quantity.ToString() == queryParameters.Quantity || string.IsNullOrEmpty(queryParameters.Quantity)) &&
                         (x.WorkerCode.StartsWith(queryParameters.WorkerCode) || string.IsNullOrEmpty(queryParameters.WorkerCode)),
                var x when x == (true, false) => exp = x =>
                         (x.Date.Date == queryParameters.Date.Value.Date) &&
                         (x.UserName.StartsWith(queryParameters.UserName) || string.IsNullOrEmpty(queryParameters.UserName)) &&
                         (x.OperationCode.StartsWith(queryParameters.OperationCode) || string.IsNullOrEmpty(queryParameters.OperationCode)) &&
                         (x.OperationName.StartsWith(queryParameters.OperationName) || string.IsNullOrEmpty(queryParameters.OperationName)) &&
                         (x.ShiftName.StartsWith(queryParameters.ShiftName) || string.IsNullOrEmpty(queryParameters.ShiftName)) &&
                         (x.Quantity.ToString() == queryParameters.Quantity || string.IsNullOrEmpty(queryParameters.Quantity)) &&
                         (x.WorkerCode.StartsWith(queryParameters.WorkerCode) || string.IsNullOrEmpty(queryParameters.WorkerCode)),
                var x when x == (false, true) => exp = x =>
                         (x.Created.Date == queryParameters.Created.Value.Date) &&
                         (x.UserName.StartsWith(queryParameters.UserName) || string.IsNullOrEmpty(queryParameters.UserName)) &&
                         (x.OperationCode.StartsWith(queryParameters.OperationCode) || string.IsNullOrEmpty(queryParameters.OperationCode)) &&
                         (x.OperationName.StartsWith(queryParameters.OperationName) || string.IsNullOrEmpty(queryParameters.OperationName)) &&
                         (x.ShiftName.StartsWith(queryParameters.ShiftName) || string.IsNullOrEmpty(queryParameters.ShiftName)) &&
                         (x.Quantity.ToString() == queryParameters.Quantity || string.IsNullOrEmpty(queryParameters.Quantity)) &&
                         (x.WorkerCode.StartsWith(queryParameters.WorkerCode) || string.IsNullOrEmpty(queryParameters.WorkerCode)),

                _ => exp = x =>
                          (x.UserName.StartsWith(queryParameters.UserName) || string.IsNullOrEmpty(queryParameters.UserName)) &&
                          (x.OperationCode.StartsWith(queryParameters.OperationCode) || string.IsNullOrEmpty(queryParameters.OperationCode)) &&
                          (x.OperationName.StartsWith(queryParameters.OperationName) || string.IsNullOrEmpty(queryParameters.OperationName)) &&
                          (x.ShiftName.StartsWith(queryParameters.ShiftName) || string.IsNullOrEmpty(queryParameters.ShiftName)) &&
                          (x.Quantity.ToString() == queryParameters.Quantity || string.IsNullOrEmpty(queryParameters.Quantity)) &&
                          (x.WorkerCode.StartsWith(queryParameters.WorkerCode) || string.IsNullOrEmpty(queryParameters.WorkerCode))
            };
            
            return query.Where(exp);
        }

    }
}
