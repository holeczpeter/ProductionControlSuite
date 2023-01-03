using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class remove_menuitem_yearly_summary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Menus set IsVisible = 0, EntityStatus=2 where Id in (10)");
            migrationBuilder.Sql("UPDATE MenuRoles set EntityStatus= 2 where MenuId = 10");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
