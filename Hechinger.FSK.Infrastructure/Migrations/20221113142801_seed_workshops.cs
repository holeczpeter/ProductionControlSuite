using Hechinger.FSK.Core.Enums;
using Hechinger.FSK.Core.Helpers;
using Microsoft.EntityFrameworkCore.Migrations;
using Newtonsoft.Json;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_workshops : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Resources/muhelyek.json");
            using (StreamReader r = new StreamReader(file))
            {
                string json = r.ReadToEnd();
                List<ImportWorkshopModel> items = JsonConvert.DeserializeObject<List<ImportWorkshopModel>>(json);
                foreach (var item in items)
                {
                    var workshopId = 1;
                    int.TryParse(item.kod, out workshopId);

                    migrationBuilder.InsertData(
                        table: "WorkShops",
                        columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "Name", "TranslatedName" },
                        values: new object[,]
                        {
                                { workshopId, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, item.muhelynev,item.muhelynev },
                        });
                }
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete WorkShops");
        }
    }
}
