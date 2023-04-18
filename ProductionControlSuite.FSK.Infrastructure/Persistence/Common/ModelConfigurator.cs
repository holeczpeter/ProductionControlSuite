

namespace ProductionControlSuite.FSK.Infrastructure.Common
{
    public static class ModelConfigurator
    {
        public static IEnumerable<Type> GetAllTypesImplementingOpenGenericType(Type openGenericType, Assembly assembly)
        {
            return from x in assembly.GetTypes()
                   from z in x.GetInterfaces()
                   let y = x.BaseType
                   where
                       (y != null && y.IsGenericType &&
                        openGenericType.IsAssignableFrom(y.GetGenericTypeDefinition())) ||
                       (z.IsGenericType &&
                        openGenericType.IsAssignableFrom(z.GetGenericTypeDefinition()))
                   select x;
        }

        public static void ConfigureModelEntities(ModelBuilder modelBuilder)
        {
            var assembly = Assembly.GetExecutingAssembly();
            foreach (var configs in GetAllTypesImplementingOpenGenericType(typeof(IEntityTypeConfiguration<>), assembly))
            {
                dynamic configuratorInstance = Activator.CreateInstance(configs);
                modelBuilder.ApplyConfiguration(configuratorInstance);
            }
        }
    }
}
