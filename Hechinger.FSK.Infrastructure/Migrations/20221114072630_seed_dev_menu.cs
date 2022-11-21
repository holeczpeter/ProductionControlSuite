﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class seed_dev_menu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO MenuRoles(MenuId,RoleId,Created,Creator,LastModified, LastModifier,EntityStatus)" +
                 $"select m.Id, {2}, GETDATE(),'SYSTEM',GETDATE(),'SYSTEM',1 from Menus m");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete MenuRoles where RoleId=2");
        }
    }
}