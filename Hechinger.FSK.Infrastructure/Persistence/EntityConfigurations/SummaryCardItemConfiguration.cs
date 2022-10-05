using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class SummaryCardItemConfiguration : IEntityTypeConfiguration<SummaryCardItem>
    {
        public void Configure(EntityTypeBuilder<SummaryCardItem> builder)
        {
            EntityConfiguration.ConfigureEntityPart(builder);

            builder
                .HasOne(x => x.SummaryCard)
                .WithMany(x => x.SummaryCardItems)
                .HasForeignKey(x => x.SummaryCardId)
                .HasConstraintName("FK_CARDANDITEM_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder
                .HasOne(x => x.Defect)
                .WithMany(x => x.SummaryCardItems)
                .HasForeignKey(x => x.DefectId)
                .HasConstraintName("FK_CARDANDDEFECT_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
