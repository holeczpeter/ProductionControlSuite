using ProductionControlSuite.FSK.Core.Helpers;
using Microsoft.EntityFrameworkCore.Migrations;
using Newtonsoft.Json;

#nullable disable

namespace ProductionControlSuite.FSK.Infrastructure.Migrations
{
    public partial class seed_products : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Resources/products.json");
            using (StreamReader r = new StreamReader(file))
            {
                string json = r.ReadToEnd();
                List<ImportProductModel> items = JsonConvert.DeserializeObject<List<ImportProductModel>>(json);
                foreach (var item in items)
                {
                    var workshopId = 1;
                    var id = 1;
                    int.TryParse(item.Id, out id);
                    int.TryParse(item.WorkshopId, out workshopId);
                    migrationBuilder.InsertData(
                        table: "Products",
                        columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus","Code" ,"Name", "TranslatedName","WorkshopId" },
                        values: new object[,]
                        {
                                { id, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active, item.Code, item.Name,item.Name, workshopId},
                        });
                }
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Products");
        }
    }
}
