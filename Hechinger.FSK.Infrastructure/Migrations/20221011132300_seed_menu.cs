using Hechinger.FSK.Core.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_menu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
              table: "Menus",
              columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "MenuType", "Name", "DisplayName", "TranslatedName", "Icon", "Order", "ParentId", "Path" },
              values: new object[,]
              {
                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Főoldal", "Főoldal","Startseite", "", 1, 0, "/home"},
                    { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Főoldal", "Főoldal","Startseite", "dashboard", 1, 1, "/home/dashboard"},
                    
                    { 3, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Hibagyűjtők", "Hibagyűjtők","Fehlersammelkarten", "", 3, 0, "/defect-card"},
                    { 4, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibagyújtő felvitele", "Hibagyűjtők","Fehlersammelkarten", "edit", 1, 3, "/defect-card/add"},
                    { 5, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibagyűjtők", "Hibagyűjtők","Fehlersammelkarten", "list", 2, 3, "/defect-card/summary-cards"},
                    { 6, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Nyomtatás", "Hibagyűjtők","Fehlersammelkarten", "print", 3, 3, "/defect-card/print"},

                    { 7, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Kimutatások", "Kimutatások","Meldung", "", 3, 0, "/report"},
                    { 8, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Hibaösszesítő", "Hibaösszesítő","Qualitätssicherung", "bar_chart", 1, 7, "/report/quality-assurance"},
                    { 9, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Selejtköltség", "Selejtköltség","Schrott kostet", "trending_up", 2, 7, "/report/crap cost"},

                    { 10, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Törzsadatok", "Törzsadatok","Stammdaten", "", 4, 0, "/basic-data"},
                    { 11, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műszakok", "Műszakok","Arbeitsschicht", "calendar_today", 1, 10, "/basic-data/shift"},
                    { 12, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műhelyek", "Műhelyek","Schrott kostet", "group_work", 2, 10, "/basic-data/workshop"},
                    { 13, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Termékek", "Termékek","Produkte", "list", 3, 10, "/basic-data/product"},
                    { 14, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műveletek", "Műveletek","Operationen", "build", 4, 10, "/basic-data/operation"},
                    { 15, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Hibák", "Hibák","Fehlers", "list", 5,10, "/basic-data/defects"},

                    { 16, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Adminisztrátori beállítások", "Adminisztrátori beállítások","Admin", "", 5, 0, "/admin"},
                    { 17, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Felhasználók", "Felhasználók","Benutzer", "supervisor_account", 1, 16, "/admin/users"},
                    { 18, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Jogosultságok", "Jogosultságok","Rollen", "verified_user", 2, 16, "/admin/roles"},

                    { 19, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Személyes beállítások", "Személyes beállítások","Persönliche Einstellungen", "", 6, 0, "/settings"},
                    { 20, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Nyelvi beállítások", "Nyelvi beállítások","Spracheinstellungen", "language", 1, 19, "/settings/language"},
                    { 21, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Jelszó beállítása", "Jelszó beállítása","Passworteinstellungen", "lock", 2, 19, "/settings/password"},

              });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
