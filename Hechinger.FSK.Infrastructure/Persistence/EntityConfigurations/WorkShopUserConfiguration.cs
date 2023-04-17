namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class WorkShopUserConfiguration : IEntityTypeConfiguration<WorkshopUser>
    {
        public void Configure(EntityTypeBuilder<WorkshopUser> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);

            builder
                .HasOne(x => x.Workshop)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.WorkshopId)
                .HasConstraintName("FK_WORKSHOPUSER_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.WorkShops)
                .HasForeignKey(x => x.UserId)
                .HasConstraintName("FK_USERWORKSHOP_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
