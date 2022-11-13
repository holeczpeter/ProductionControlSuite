using Hechinger.FSK.Core.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_languages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                 table: "Languages",
                 columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "Name", "TranslatedName", "Code" },
                 values: new object[,]
                 {
                                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, "Magyar", "Ungarische", "hu"},
                                    { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, "Német", "Deutche", "de"},
                 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Languages");
        }
    }
}
