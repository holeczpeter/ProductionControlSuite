using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductionControlSuite.FSK.Infrastructure.Migrations
{
    public partial class seed_shifts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
            table: "Shifts",
            columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "Name", "TranslatedName", "Code", "TranslatedCode", "Start", "End" },
            values: new object[,]
            {
                { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,"Délelőtt", "Frühschicht", "DE", "F", new TimeSpan(6,0,0),new TimeSpan(14,0,0)},
                { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,"Délután", "Spätschicht", "DU", "S", new TimeSpan(14,0,0),new TimeSpan(22,0,0)},
                { 3, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,"Éjszaka", "Nachtschicht", "É", "N", new TimeSpan(22,0,0),new TimeSpan(6,0,0)},

            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Shifts");
        }
    }
}
