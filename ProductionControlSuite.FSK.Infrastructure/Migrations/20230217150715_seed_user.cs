using ProductionControlSuite.FSK.Core.Helpers;
using Microsoft.EntityFrameworkCore.Migrations;
using Newtonsoft.Json;

#nullable disable

namespace ProductionControlSuite.FSK.Infrastructure.Migrations
{
    public partial class seed_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
            var file = Path.Combine(AppContext.BaseDirectory, "Resources/users.json");
            using (StreamReader r = new StreamReader(file))
            {
                string json = r.ReadToEnd();
                List<ImportUserModel> items = JsonConvert.DeserializeObject<List<ImportUserModel>>(json);
                foreach (var item in items)
                {
                    migrationBuilder.InsertData(
                        table: "Users",
                        columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "Code", "FirstName", "LastName", "Salt", "Password", "IsTemporary", "ExpiryDate", "ChangePass", "RoleId", "LanguageId", "PageSize", "AvatarType" },
                        values: new object[,]
                        {

                            { item.Id, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,item.Code, item.FirstName, item.LastName, "PerjpnB0Agfh243gxF1hGg==","8wxZMSndeT/5g3SKeO2583mx+ibQwz+fJI7UJ48NoL0=", true, DateTime.Now.AddHours(2),DateTime.Now, $"{item.RoleId}",1,25,0}
                        });
                }
            }
        }


        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete Users");
        }
    }
}
