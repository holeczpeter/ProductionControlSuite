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
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> query, string memberName, bool isAsc)
        {
            if (memberName == null) memberName = "id";
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
                          (x.WorkshopName.StartsWith(queryParameters.WorkshopName) || string.IsNullOrEmpty(queryParameters.WorkshopName));

            return query.Where(exp);
        }
        public static IQueryable<OperationModel> FilterOperation(this IQueryable<OperationModel> query, OperationRequestParameters queryParameters)
        {
            Expression<Func<OperationModel, bool>> exp = x =>
                          (x.Code.StartsWith(queryParameters.Code) || string.IsNullOrEmpty(queryParameters.Code)) &&
                          (x.Name.StartsWith(queryParameters.Name) || string.IsNullOrEmpty(queryParameters.Name)) &&
                          (x.TranslatedName.StartsWith(queryParameters.TranslatedName) || string.IsNullOrEmpty(queryParameters.TranslatedName)) &&
                          (x.ProductName.StartsWith(queryParameters.ProductName) || string.IsNullOrEmpty(queryParameters.ProductName)) &&
                          (x.ProductTranslatedName.StartsWith(queryParameters.ProductTranslatedName) || string.IsNullOrEmpty(queryParameters.ProductTranslatedName)) &&
                          (x.ProductCode.StartsWith(queryParameters.ProductCode) || string.IsNullOrEmpty(queryParameters.ProductCode));

            return query.Where(exp);
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

            if (queryParameters.DefectCategoryName == "F0" || queryParameters.DefectCategoryName == "F1" || queryParameters.DefectCategoryName == "F2")
            {
                var currentCategoryFilter = (queryParameters.DefectCategoryName) switch
                {
                    var x when x == ("F0") => DefectCategories.F0,
                    var x when x == ("F1") => DefectCategories.F1,
                    var x when x == ("F2") => DefectCategories.F2,
                    _ => DefectCategories.F0,
                };
                Expression<Func<DefectModel, bool>> exp2 = x =>
                         (x.DefectCategory == currentCategoryFilter);
                filtered = filtered.Where(exp2);
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
