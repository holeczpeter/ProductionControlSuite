using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class SummaryCardConfiguration : IEntityTypeConfiguration<SummaryCard>
    {
        public void Configure(EntityTypeBuilder<SummaryCard> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);

            builder
               .HasOne(x => x.User)
               .WithMany(x => x.SummaryCards)
               .HasForeignKey(x => x.UserId)
               .HasConstraintName("FK_USERCARDS_CONNECTION")
               .OnDelete(DeleteBehavior.Restrict)
               .IsRequired();

            builder
               .HasOne(x => x.Operation)
               .WithMany(x => x.SummaryCards)
               .HasForeignKey(x => x.OperationId)
               .HasConstraintName("FK_OPERATIONCARDS_CONNECTION")
               .OnDelete(DeleteBehavior.Restrict)
               .IsRequired();

            builder
             .HasOne(x => x.Shift)
             .WithMany(x => x.SummaryCards)
             .HasForeignKey(x => x.ShiftId)
             .HasConstraintName("FK_SHIFTSCARDS_CONNECTION")
             .OnDelete(DeleteBehavior.Restrict)
             .IsRequired();

            builder
              .Ignore(e => e.F0);
            builder
             .Ignore(e => e.F1);
            builder
             .Ignore(e => e.F2);
            builder
             .Ignore(e => e.DefectQuantity);

        }
    }
}
