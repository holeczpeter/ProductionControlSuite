using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class comment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "SummaryCardItem",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "SummaryCardItem");
        }
    }
}
