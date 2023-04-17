namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class MenuRoleConfiguration : IEntityTypeConfiguration<MenuRole>
    {
        public void Configure(EntityTypeBuilder<MenuRole> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);

            builder
                .HasOne(x => x.Menu)
                .WithMany(x => x.MenuRoles)
                .HasForeignKey(x => x.MenuId)
                .HasConstraintName("FK_MENUROLE_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(x => x.Role)
                .WithMany(x => x.MenuRoles)
                .HasForeignKey(x => x.RoleId)
                .HasConstraintName("FK_ROLEMENU_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict);

          
              
        }
    }
}
