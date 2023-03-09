using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_workshopuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var k = 0;
            for (int i = 1; i < 8; i++)
            {
                for (int j = 1; j < 6; j++)
                {
                    k++;
                    migrationBuilder.InsertData(
                      table: "WorkshopUsers",
                      columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "WorkshopId", "UserId" },
                      values: new object[,]
                      {

                            { k, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,j, i}
                      });

                }
               
            }

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
