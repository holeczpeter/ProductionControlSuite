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
                          (x.WorkshopName.StartsWith(queryParameters.TranslatedName) || string.IsNullOrEmpty(queryParameters.WorkshopName));

            return query.Where(exp);
        }
        public static IQueryable<OperationModel> FilterOperation(this IQueryable<OperationModel> query, OperationRequestParameters queryParameters)
        {
            Expression<Func<OperationModel, bool>> exp = x =>
                          (x.Code.StartsWith(queryParameters.Code) || string.IsNullOrEmpty(queryParameters.Code)) &&
                          (x.Name.StartsWith(queryParameters.Name) || string.IsNullOrEmpty(queryParameters.Name)) &&
                          (x.TranslatedName.StartsWith(queryParameters.TranslatedName) || string.IsNullOrEmpty(queryParameters.TranslatedName)) &&
                          (x.ProductName.StartsWith(queryParameters.ProductName) || string.IsNullOrEmpty(queryParameters.ProductName)) &&
                          (x.ProductCode.StartsWith(queryParameters.ProductCode) || string.IsNullOrEmpty(queryParameters.ProductCode)) ;

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
                          (x.DefectCategoryName.StartsWith(queryParameters.DefectCategoryName) || string.IsNullOrEmpty(queryParameters.DefectCategoryName));

            return query.Where(exp);
        }
        public static IQueryable<SummaryCardModel> FilterSummaryCard(this IQueryable<SummaryCardModel> query, SummaryCardRequestParameters queryParameters)
        {
            Expression<Func<SummaryCardModel, bool>> exp = x =>
                          (x.Created.ToString() == queryParameters.Created || string.IsNullOrEmpty(queryParameters.Created)) &&
                          (x.Date.ToString() ==  queryParameters.Date || string.IsNullOrEmpty(queryParameters.Date)) &&
                          (x.UserName.StartsWith(queryParameters.UserName) || string.IsNullOrEmpty(queryParameters.UserName)) &&
                          (x.OperationCode.StartsWith(queryParameters.OperationCode) || string.IsNullOrEmpty(queryParameters.OperationCode)) &&
                          (x.OperationName.StartsWith(queryParameters.OperationName) || string.IsNullOrEmpty(queryParameters.OperationName)) &&
                          (x.ShiftName.StartsWith(queryParameters.ShiftName) || string.IsNullOrEmpty(queryParameters.ShiftName)) &&
                          (x.Quantity.ToString() == queryParameters.Quantity || string.IsNullOrEmpty(queryParameters.Quantity)) &&
                          (x.WorkerName.StartsWith(queryParameters.WorkerName) || string.IsNullOrEmpty(queryParameters.WorkerName));

            return query.Where(exp);
        }
    }
}
