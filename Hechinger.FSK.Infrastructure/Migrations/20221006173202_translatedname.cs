using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class translatedname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "WorkShops",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "UserRoles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "SummaryCards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "SummaryCardItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Shifts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Role",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Menus",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "MenuRoles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "Defects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "AuditLogProperties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslatedName",
                table: "AuditLogEntities",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "WorkShops");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "UserRoles");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "SummaryCards");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "SummaryCardItem");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Shifts");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "MenuRoles");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "Defects");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "AuditLogProperties");

            migrationBuilder.DropColumn(
                name: "TranslatedName",
                table: "AuditLogEntities");
        }
    }
}
