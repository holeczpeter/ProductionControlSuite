using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class fix_menu_names : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.Sql("UPDATE Menus set Name = 'Hibagyűjtő lapok', DisplayName='Hibagyűjtő lapok' where Id = 5");
           migrationBuilder.Sql("UPDATE Menus set Name = 'Hibaösszesítők', DisplayName='Hibaösszesítők' where Id = 9");
        }


        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
