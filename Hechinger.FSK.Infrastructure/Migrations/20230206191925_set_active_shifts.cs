using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class set_active_shifts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Menus set EntityStatus = 1 where Id = 16");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
