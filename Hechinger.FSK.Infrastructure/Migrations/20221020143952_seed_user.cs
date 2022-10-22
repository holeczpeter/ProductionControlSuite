﻿using Hechinger.FSK.Core.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.InsertData(
            table: "Users",
            columns: new[] { "Id", "Created", "Creator", "LastModified", "LastModifier", "EntityStatus", "Code", "FirstName", "LastName","Salt","Password", "IsTemporary", "ExpiryDate", "ChangePass" , "RoleId", "LanguageId" },
            values: new object[,]
            {
                    { 1, DateTime.Now, "SYSTEM",DateTime.Now, "SYSTEM", (int)EntityStatuses.Active,"9999", "Péter", "Holecz", "PerjpnB0Agfh243gxF1hGg==","8wxZMSndeT/5g3SKeO2583mx+ibQwz+fJI7UJ48NoL0=", true, DateTime.Now.AddHours(2),DateTime.Now, 2,1}
            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}