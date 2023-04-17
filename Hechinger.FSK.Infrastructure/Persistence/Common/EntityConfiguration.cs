namespace Hechinger.FSK.Infrastructure.Common
{
    public static class EntityConfiguration
    {
        public static void ConfigureEntity<TEntity>(EntityTypeBuilder<TEntity> builder) where TEntity :  Entity
        {

            builder
                .HasKey(x => x.Id);
            builder
                .Property(x => x.Id)
                .HasColumnOrder(0);
            builder
                .Property(e => e.Created)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAdd();
            builder
                .Property(e => e.Creator)
                .HasMaxLength(10)
                .ValueGeneratedOnAdd();
            builder
               .Property(e => e.EntityStatus);
            builder
                .HasIndex(e => e.EntityStatus);
            builder
                .Property(e => e.RowVersion)
                .IsRowVersion();
           
        }
        public static void ConfigureBaseEntity<TEntity>(EntityTypeBuilder<TEntity> builder) where TEntity : BaseEntity
        {
            builder
                .Property(x => x.Name)
                .HasColumnOrder(1);
            builder
               .Property(x => x.Code)
               .HasMaxLength(25)
               .HasColumnOrder(2);
            builder
                .Property(x => x.TranslatedName)
                .HasColumnOrder(3);
           
            builder
               .HasIndex(e => e.Name);
            builder
                .HasIndex(e => e.Code);
            builder
              .HasIndex(e => e.TranslatedName);
        }
    }
}
