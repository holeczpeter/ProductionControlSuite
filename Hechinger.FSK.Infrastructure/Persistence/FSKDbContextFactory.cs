

namespace Hechinger.FSK.Infrastructure.Persistence
{
    public class FSKDbContextFactory : IDesignTimeDbContextFactory<FSKDbContext>
    {
        public FSKDbContext CreateDbContext(string[] args)
        {
            var contextBuilder = new DbContextOptionsBuilder<FSKDbContext>();
            contextBuilder.UseSqlServer("Server=DESKTOP-QMEJOI6\\SQLEXPRESS;Database=FSK_PROD;Integrated Security=SSPI;MultipleActiveResultSets=true;TrustServerCertificate=True");
            return new FSKDbContext(contextBuilder.Options);
        }
    }
}
