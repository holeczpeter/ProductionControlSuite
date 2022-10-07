using Hechinger.FSK.Core.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_menus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.InsertData(
              table: "Menus",
              columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus","MenuType","Order", "Name", "TranslatedName", "DisplayName", "ParentId", "Icon","Path" },
              values: new object[,]
              {
                   { 1, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.Module,  1,"Törzsadatok","Grundinformationen","",0,"fact_check","/basic-data" },
                   { 2, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu, 1,"Műszakok","Schichte","",1,"fact_check","/basic-data/shift" },
                   { 3, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu,  1,"Műhelyek","Werkstätte","",1,"fact_check","/basic-data/workshop" },
                   { 4, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu,  1,"Termékek","Produkte","",1,"fact_check","/basic-data/product" },
                   { 5, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu,  1,"Műveletek","Operationen","",1,"fact_check","/basic-data/operation" },
                   { 6, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu,  1,"Hibák","Defekte","",1,"fact_check","/basic-data/defects" },


                   { 7, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.Module,  1,"Adminisztrátori beállítások","Admin-Einstellungen","",0,"settings","/admin" },
                   { 8, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu, 1,"Felhasználók","Benutzer","",7,"supervisor_account","/admin/user" },
                   { 9, DateTime.Now, "SYSTEM", DateTime.Now, "SYSTEM",  1, (int)MenuTypes.SubMenu,  1,"Jogosultságok","Genehmigung","",7,"supervisor_account","/admin/role" },
                   
              });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
