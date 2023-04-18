using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductionControlSuite.FSK.Infrastructure.Migrations
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
                    { 5, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Hibagyűjtő lapok", "Hibagyűjtő lapok","Fehlersammelkarten", "list", 2, 3, "/defect-card/summary-cards"},
                    { 6, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Nyomtatás", "Nyomtatás","Drucke", "print", 3, 3, "/defect-card/print"},

                    { 7, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.Module,  true,"Kimutatások", "Kimutatások","Meldung", "", 3, 0, "/report"},
                    { 8, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Darabszám jelentés", "Darabszám jelentés","Stückzahlmeldung", "summarize", 1, 7, "/report/quantity-report"},
                    { 9, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,  (int)MenuTypes.SubMenu, true,"Hibaösszesítők", "Hibaösszesítők","Qualitätsmeldung", "query_stats", 2, 7, "/report/quality-report"},
                    { 10, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.MainMenu, true,"Selejtköltség", "Selejtköltség","Schrott kostet", "trending_up", 4, 7, "/report/crap-cost"},
                    { 11, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Művelet", "Művelet","Operation", "trending_up", 1, 10, "/report/crap-cost/operation"},
                    { 12, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Termék", "Termék","Produkt", "trending_up", 2, 10, "/report/crap-cost/product"},
                    { 13, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műhely", "Műhely","Werkstatt", "trending_up", 3, 10, "/report/crap-cost/workshop"},

                    { 14, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.MainMenu,true,"Dolgozók", "Dolgozók","Arbeiter", "person_search", 5, 7, "/report/worker"},
                    { 15, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Hibák összehasonlítása", "Hibák összehasonlítása","Arbeiter fehlers meldung", "compare_arrows", 1, 14, "/report/worker/worker-defect-statistics"},
                    { 16, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Dolgozók összehasonlítása", "Dolgozók összehasonlítása","Arbeiters meldung", "compare_arrows", 2, 14, "/report/worker/worker-compare-statistics"},

                    { 17, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.Module,  true,"Törzsadatok", "Törzsadatok","Stammdaten", "", 4, 0, "/basic-data"},
                    { 18, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műszakok", "Műszakok","Arbeitsschicht", "calendar_today", 1, 17, "/basic-data/shift"},
                    { 19, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műhelyek", "Műhelyek","Werkstätte", "group_work", 2, 17, "/basic-data/workshop"},
                    { 20, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Termékek", "Termékek","Produkte", "list", 3, 17, "/basic-data/product"},
                    { 21, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Műveletek", "Műveletek","Operationen", "build", 4, 17, "/basic-data/operation"},
                    { 22, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Hibák", "Hibák","Fehlers", "list", 5,17, "/basic-data/defects"},
                    { 23, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, false,"Hibaösszesítők", "Hibaösszesítők","Qualitätsmeldung", "table_view", 6,17, "/basic-data/defect-groups"},

                    { 24, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.Module,  true,"Adminisztrátor", "Adminisztrátor","Admin", "", 5, 0, "/admin"},
                    { 25, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Felhasználók", "Felhasználók","Benutzer", "supervisor_account", 1, 24, "/admin/users"},
                    { 26, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Jogosultságok", "Jogosultságok","Rollen", "verified_user", 2, 24, "/admin/roles"},
                    { 27, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Törzsadatok importálása", "Törzsadatok importálása","Import", "upload", 3, 24, "/admin/import"},

                    { 28, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.Module,  true,"Személyes beállítások", "Személyes beállítások","Persönliche Einstellungen", "", 6, 0, "/settings"},
                    { 29, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Alkalmazás beállítások", "Alkalmazás beállítások","Appeinstellungen", "settings_applications", 1, 28, "/settings/application"},
                    { 30, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, (int)MenuTypes.SubMenu, true,"Jelszó beállítása", "Jelszó beállítása","Passworteinstellungen", "lock", 2, 28, "/settings/password"},

             });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Menus");
        }
    }
}
