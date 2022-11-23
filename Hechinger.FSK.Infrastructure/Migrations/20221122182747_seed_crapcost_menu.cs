using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_crapcost_menu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.Sql("UPDATE Menus set MenuType = 1 where Id in (11)");
            migrationBuilder.InsertData(
             table: "Menus",
             columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "MenuType", "IsVisible", "Name", "DisplayName", "TranslatedName", "Icon", "Order", "ParentId", "Path" },
             values: new object[,]
             {
                 { 29, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Művelet", "Művelet","Operation", "trending_up", 1, 11, "/report/crap-cost/operation"},
                 { 30, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Termék", "Termék","Produkt", "trending_up", 2, 11, "/report/crap-cost/product"},
                 { 31, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műhely", "Műhely","Werkstatt", "trending_up", 3, 11, "/report/crap-cost/workshop"},
             });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
