using Microsoft.EntityFrameworkCore.Design;

namespace Hechinger.FSK.Infrastructure.Persistence
{
    public class FSKDbContextFactory : IDesignTimeDbContextFactory<FSKDbContext>
    {
        public FSKDbContext CreateDbContext(string[] args)
        {
            var contextBuilder = new DbContextOptionsBuilder<FSKDbContext>();
            contextBuilder.UseSqlServer("Server=DESKTOP-QMEJOI6\\SQLEXPRESS;Database=FSK_DEV_GROUP;Integrated Security=SSPI;MultipleActiveResultSets=true;");
            return new FSKDbContext(contextBuilder.Options);
        }
    }
}
