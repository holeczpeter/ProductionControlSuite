namespace ProductionControlSuite.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);

            builder
            .HasOne(x => x.Role)
            .WithMany(x => x.Users)
            .HasForeignKey(x => x.RoleId)
            .HasConstraintName("FK_USERROLE_CONNECTION")
            .OnDelete(DeleteBehavior.Restrict);

            builder
           .HasOne(x => x.Language)
           .WithMany(x => x.Users)
           .HasForeignKey(x => x.LanguageId)
           .HasConstraintName("FK_USERLANGUAGE_CONNECTION")
           .OnDelete(DeleteBehavior.Restrict);

            builder.Property(x => x.Code).HasMaxLength(20);
            builder.Property(x => x.FirstName).HasMaxLength(25);
            builder.Property(x => x.LastName).HasMaxLength(25);
        }
    }
}
