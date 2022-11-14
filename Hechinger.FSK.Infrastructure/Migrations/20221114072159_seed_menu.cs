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
             columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "MenuType", "IsVisible", "Name", "DisplayName", "TranslatedName", "Icon", "Order", "ParentId", "Path" },
             values: new object[,]
             {
                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module,  true,"Főoldal", "Főoldal","Startseite", "", 1, 0, "/home"},
                    { 2, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Főoldal", "Főoldal","Startseite", "dashboard", 1, 1, "/home/dashboard"},

                    { 3, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module,  true,"Hibagyűjtők", "Hibagyűjtők","Fehlersammelkarten", "", 2, 0, "/defect-card"},
                    { 4, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Hibagyűjtő felvitele", "Hibagyűjtők felvitele","Neue Fehlersammelkarte", "add", 1, 3, "/defect-card/add"},
                    { 5, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Hibagyűjtő kártyák", "Hibagyűjtő kártyák","Fehlersammelkarten", "list", 2, 3, "/defect-card/summary-cards"},
                    { 6, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Nyomtatás", "Nyomtatás","Drucke", "print", 3, 3, "/defect-card/print"},

                    { 7, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module,  true,"Kimutatások", "Kimutatások","Meldung", "", 3, 0, "/report"},
                    { 8, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Darabszám jelentés", "Darabszám jelentés","Stückzahlmeldung", "summarize", 1, 7, "/report/quantity-report"},
                    { 9, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Hibaösszesítő", "Hibaösszesítő","Qualitätsmeldung", "query_stats", 2, 7, "/report/quality-report"},
                    { 10, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Éves összegzés", "Éves összegzés","Qualitätsverlauf monatlich", "bar_chart", 3, 7, "/report/quality-history-monthly"},
                    { 11, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Selejtköltség", "Selejtköltség","Schrott kostet", "trending_up", 4, 7, "/report/crap-cost"},
                    { 12, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.MainMenu,true,"Dolgozók", "Dolgozók","Arbeiter", "person_search", 5, 7, "/report/worker"},
                    { 13, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Hibák összehasonlítása", "Hibák összehasonlítása","Arbeiter fehlers meldung", "compare_arrows", 1, 12, "/report/worker/worker-defect-statistics"},
                    { 14, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Dolgozók összehasonlítása", "Dolgozók összehasonlítása","Arbeiters meldung", "compare_arrows", 2, 12, "/report/worker/worker-compare-statistics"},

                    { 15, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.Module,  true,"Törzsadatok", "Törzsadatok","Stammdaten", "", 4, 0, "/basic-data"},
                    { 16, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műszakok", "Műszakok","Arbeitsschicht", "calendar_today", 1, 15, "/basic-data/shift"},
                    { 17, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műhelyek", "Műhelyek","Werkstätte", "group_work", 2, 15, "/basic-data/workshop"},
                    { 18, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Termékek", "Termékek","Produkte", "list", 3, 15, "/basic-data/product"},
                    { 19, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műveletek", "Műveletek","Operationen", "build", 4, 15, "/basic-data/operation"},
                    { 20, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Hibák", "Hibák","Fehlers", "list", 5,15, "/basic-data/defects"},
                    { 21, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, false,"Hibaösszesítők", "Hibaösszesítők","Qualitätsmeldung", "table_view", 6,15, "/basic-data/defect-groups"},

                    { 22, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.Module,  true,"Adminisztrátor", "Adminisztrátor","Admin", "", 5, 0, "/admin"},
                    { 23, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Felhasználók", "Felhasználók","Benutzer", "supervisor_account", 1, 22, "/admin/users"},
                    { 24, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Jogosultságok", "Jogosultságok","Rollen", "verified_user", 2, 22, "/admin/roles"},
                    { 25, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Törzsadatok importálása", "Törzsadatok importálása","Import", "upload", 3, 22, "/admin/import"},

                    { 26, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.Module,  true,"Személyes beállítások", "Személyes beállítások","Persönliche Einstellungen", "", 6, 0, "/settings"},
                    { 27, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Alkalmazás beállítások", "Alkalmazás beállítások","Appeinstellungen", "settings_applications", 1, 26, "/settings/application"},
                    { 28, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Jelszó beállítása", "Jelszó beállítása","Passworteinstellungen", "lock", 2, 26, "/settings/password"},

             });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Menus");
        }
    }
}
