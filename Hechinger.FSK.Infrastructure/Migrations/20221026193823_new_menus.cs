using Hechinger.FSK.Core.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class new_menus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete MenuRoles");
            migrationBuilder.Sql("Delete Menus");
            migrationBuilder.InsertData(
              table: "Menus",
              columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "MenuType", "Name", "DisplayName", "TranslatedName", "Icon", "Order", "ParentId", "Path" },
              values: new object[,]
              {
                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Főoldal", "Főoldal","Startseite", "", 1, 0, "/home"},
                    { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Főoldal", "Főoldal","Startseite", "dashboard", 1, 1, "/home/dashboard"},

                    { 3, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Hibagyűjtők", "Hibagyűjtők","Fehlersammelkarten", "", 3, 0, "/defect-card"},
                    { 4, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibagyűjtő felvitele", "Hibagyűjtők felvitele","Neue Fehlersammelkarte", "add", 1, 3, "/defect-card/add"},
                    { 5, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibagyűjtő kártyák", "Hibagyűjtő kártyák","Fehlersammelkarten", "list", 2, 3, "/defect-card/summary-cards"},
                    { 6, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Nyomtatás", "Nyomtatás","Drucke", "print", 3, 3, "/defect-card/print"},

                    { 7, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Kimutatások", "Kimutatások","Meldung", "", 3, 0, "/report"},
                    { 8, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Darabszám jelentés", "Darabszám jelentés","Stückzahlmeldung", "", 1, 7, "/report/quantity-report"},
                    { 9, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, "Hibaösszesítő", "Hibaösszesítő","Qualitätsmeldung", "", 2, 7, "/report/quality-report"},
                    { 10, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Éves összegzés", "Éves összegzés","Qualitätsverlauf monatlich", "bar_chart", 3, 7, "/report/quality-history-monthly"},
                    { 11, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Selejtköltség", "Selejtköltség","Schrott kostet", "trending_up", 4, 7, "/report/crap-cost"},
                    { 12, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.MainMenu,"Dolgozók", "Dolgozók","Arbeiter", "person_search", 5, 7, "/report/worker"},
                    { 13, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Hibák összehasonlítása", "Hibák összehasonlítása","Arbeiter fehlers meldung", "compare_arrows", 1, 12, "/report/worker/worker-defect-statistics"},
                    { 14, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Dolgozók összehasonlítása", "Dolgozók összehasonlítása","Arbeiters meldung", "compare_arrows", 2, 12, "/report/worker/worker-compare-statistics"},


                    { 15, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Törzsadatok", "Törzsadatok","Stammdaten", "", 4, 0, "/basic-data"},
                    { 16, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műszakok", "Műszakok","Arbeitsschicht", "calendar_today", 1, 15, "/basic-data/shift"},
                    { 17, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műhelyek", "Műhelyek","Werkstätte", "group_work", 2, 15, "/basic-data/workshop"},
                    { 18, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Termékek", "Termékek","Produkte", "list", 3, 15, "/basic-data/product"},
                    { 19, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Műveletek", "Műveletek","Operationen", "build", 4, 15, "/basic-data/operation"},
                    { 20, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Hibák", "Hibák","Fehlers", "list", 5,15, "/basic-data/defects"},

                    { 21, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Adminisztrátori beállítások", "Adminisztrátori beállítások","Admin", "", 5, 0, "/admin"},
                    { 22, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Felhasználók", "Felhasználók","Benutzer", "supervisor_account", 1, 21, "/admin/users"},
                    { 23, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Jogosultságok", "Jogosultságok","Rollen", "verified_user", 2, 21, "/admin/roles"},

                    { 24, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module, "Személyes beállítások", "Személyes beállítások","Persönliche Einstellungen", "", 6, 0, "/settings"},
                    { 25, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Alkalmazás beállítások", "Alkalmazás beállítások","Appeinstellungen", "settings_applications", 1, 24, "/settings/application"},
                    { 26, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu,"Jelszó beállítása", "Jelszó beállítása","Passworteinstellungen", "lock", 2, 24, "/settings/password"},

              });
           
            migrationBuilder.Sql("INSERT INTO MenuRoles(MenuId,RoleId,Created,Creator,LastModified, LastModifier,EntityStatus)" +
                $"select m.Id, {2}, GETDATE(),'SYSTEM',GETDATE(),'SYSTEM',1 from Menus m");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
