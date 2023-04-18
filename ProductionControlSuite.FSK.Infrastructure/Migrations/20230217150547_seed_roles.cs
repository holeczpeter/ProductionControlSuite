using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductionControlSuite.FSK.Infrastructure.Migrations
{
    public partial class seed_roles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
            table: "Roles",
            columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "Name", "TranslatedName", "Code", "IsDefault" },
            values: new object[,]
            {
                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, "Felhasználó", "Benutzer", "USER", true},
                    { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, "Developer", "Developer", "DEV", false},
                    { 3, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, "Admin", "Admin", "ADMIN", false},
            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Roles");
        }
    }
}
