using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductionControlSuite.FSK.Infrastructure.Migrations
{
    public partial class db_triggers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sqlFile = Path.Combine(AppContext.BaseDirectory, "Resources/audit_triggers.sql");
            migrationBuilder.Sql(File.ReadAllText(sqlFile));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
