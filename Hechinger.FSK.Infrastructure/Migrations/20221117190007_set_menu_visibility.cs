using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class set_menu_visibility : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Menus set IsVisible = 1 where Id in (9,11,21)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
