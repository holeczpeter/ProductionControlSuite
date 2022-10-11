using Hechinger.FSK.Core.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class menu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

             migrationBuilder.InsertData(
              table: "Menus",
              columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "MenuType", "Name", "DisplayName", "TranslatedName", "Icon", "Order", "ParentId", "Path"},
              values: new object[,]
              {
                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Hibagyűjtők", "Hibagyűjtők","Fehlersammelkarten", "", 1, 0, "/defect-card"},
                    { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibagyújtő felvitele", "Hibagyűjtők","Fehlersammelkarten", "edit", 1, 1, "/defect-card/add"},
                    { 3, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibagyűjtők", "Hibagyűjtők","Fehlersammelkarten", "list", 2, 1, "/defect-card/summary-cards"},
                    { 4, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Nyomtatás", "Hibagyűjtők","Fehlersammelkarten", "print", 3, 1, "/defect-card/print"},

                    { 5, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Kimutatások", "Kimutatások","Meldung", "", 2, 0, "/report"},
                    { 6, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Hibaösszesítő", "Hibaösszesítő","Qualitätssicherung", "bar_chart", 1, 5, "/report/quality-assurance"},
                    { 7, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Selejtköltség", "Selejtköltség","Schrott kostet", "trending_up", 2, 5, "/report/crap cost"},

                    { 8, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Törzsadatok", "Törzsadatok","Stammdaten", "", 3, 0, "/basic-data"},
                    { 9, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műszakok", "Műszakok","Arbeitsschicht", "calendar_today", 1, 8, "/basic-data/shift"},
                    { 10, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műhelyek", "Műhelyek","Schrott kostet", "group_work", 2, 8, "/basic-data/workshop"},
                    { 11, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Termékek", "Termékek","Produkte", "list", 3, 8, "/basic-data/product"},
                    { 12, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műveletek", "Műveletek","Operationen", "build", 4, 8, "/basic-data/operation"},
                    { 13, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Hibák", "Hibák","Fehlers", "list", 5,8, "/basic-data/defects"},

                    { 14, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Adminisztrátori beállítások", "Adminisztrátori beállítások","Admin", "", 4, 0, "/admin"},
                    { 15, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Felhasználók", "Felhasználók","Benutzer", "supervisor_account", 1, 14, "/admin/users"},
                    { 16, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Jogosultságok", "Jogosultságok","Rollen", "verified_user", 2, 14, "/admin/roles"},

                    { 17, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Személyes beállítások", "Személyes beállítások","Persönliche Einstellungen", "", 5, 0, "/settings"},
                    { 18, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Nyelvi beállítások", "Nyelvi beállítások","Spracheinstellungen", "language", 1, 17, "/settings/language"},
                    { 19, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Jelszó beállítása", "Jelszó beállítása","Passworteinstellungen", "lock", 2, 17, "/settings/password"},

              });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
