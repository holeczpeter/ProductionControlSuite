using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hechinger.FSK.Infrastructure.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditLogEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    EntityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogEntities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntityGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    GroupType = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    PpmGoal = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ENTITYGROUP_CONNECTION",
                        column: x => x.ParentId,
                        principalTable: "EntityGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MenuType = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TranslatedCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Start = table.Column<TimeSpan>(type: "time", nullable: false),
                    End = table.Column<TimeSpan>(type: "time", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workshops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workshops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuditLogEntityId = table.Column<int>(type: "int", nullable: false),
                    PropertyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AUDITANDITEMS_CONNECTION",
                        column: x => x.AuditLogEntityId,
                        principalTable: "AuditLogEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityGroupRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntityGroupId = table.Column<int>(type: "int", nullable: false),
                    EntityId = table.Column<int>(type: "int", nullable: false),
                    EntityType = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityGroupRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GROUPRELATION_CONNECTION",
                        column: x => x.EntityGroupId,
                        principalTable: "EntityGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MenuRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MENUROLE_CONNECTION",
                        column: x => x.MenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ROLEMENU_CONNECTION",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsTemporary = table.Column<bool>(type: "bit", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ChangePass = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    LanguageId = table.Column<int>(type: "int", nullable: false),
                    PageSize = table.Column<int>(type: "int", nullable: false),
                    AvatarType = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_USERLANGUAGE_CONNECTION",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_USERROLE_CONNECTION",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    WorkshopId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WORKSHOPPRODUCT_CONNECTION",
                        column: x => x.WorkshopId,
                        principalTable: "Workshops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkshopUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkshopId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkshopUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_USERWORKSHOP_CONNECTION",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WORKSHOPUSER_CONNECTION",
                        column: x => x.WorkshopId,
                        principalTable: "Workshops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    OperationTime = table.Column<double>(type: "float", nullable: false),
                    Norma = table.Column<double>(type: "float", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    ComponentQuantity = table.Column<int>(type: "int", nullable: false),
                    PpmGoal = table.Column<int>(type: "int", nullable: false),
                    DefectCataglogLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PRODUCTIONOPERATION_CONNECTION",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Defects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    TranslatedName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DefectCategory = table.Column<int>(type: "int", nullable: false),
                    OperationId = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Defects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OPERATIONDEFECTS_CONNECTION",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SummaryCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ShiftId = table.Column<int>(type: "int", nullable: false),
                    OperationId = table.Column<int>(type: "int", nullable: false),
                    WorkerCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LOS = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SummaryCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OPERATIONCARDS_CONNECTION",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SHIFTSCARDS_CONNECTION",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_USERCARDS_CONNECTION",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    DefectId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.Id);
                    table.ForeignKey(
                        name: "FKDEFECTPICTURE_CONNECTION",
                        column: x => x.DefectId,
                        principalTable: "Defects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SummaryCardItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DefectId = table.Column<int>(type: "int", nullable: false),
                    SummaryCardId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Creator = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    EntityStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SummaryCardItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CARDANDDEFECT_CONNECTION",
                        column: x => x.DefectId,
                        principalTable: "Defects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CARDANDITEM_CONNECTION",
                        column: x => x.SummaryCardId,
                        principalTable: "SummaryCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogProperties_AuditLogEntityId",
                table: "AuditLogProperties",
                column: "AuditLogEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_Code",
                table: "Defects",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_EntityStatus",
                table: "Defects",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_Name",
                table: "Defects",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_OperationId",
                table: "Defects",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_TranslatedName",
                table: "Defects",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_EntityGroupRelations_EntityGroupId",
                table: "EntityGroupRelations",
                column: "EntityGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityGroupRelations_EntityStatus",
                table: "EntityGroupRelations",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_EntityGroups_EntityStatus",
                table: "EntityGroups",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_EntityGroups_ParentId",
                table: "EntityGroups",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Languages_Code",
                table: "Languages",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Languages_EntityStatus",
                table: "Languages",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Languages_Name",
                table: "Languages",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Languages_TranslatedName",
                table: "Languages",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_MenuRoles_EntityStatus",
                table: "MenuRoles",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_MenuRoles_MenuId",
                table: "MenuRoles",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuRoles_RoleId",
                table: "MenuRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_Code",
                table: "Menus",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_EntityStatus",
                table: "Menus",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_Name",
                table: "Menus",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_TranslatedName",
                table: "Menus",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_Code",
                table: "Operations",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_EntityStatus",
                table: "Operations",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_Name",
                table: "Operations",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ProductId",
                table: "Operations",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_TranslatedName",
                table: "Operations",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_DefectId",
                table: "Pictures",
                column: "DefectId");

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_EntityStatus",
                table: "Pictures",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Code",
                table: "Products",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Products_EntityStatus",
                table: "Products",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Name",
                table: "Products",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Products_TranslatedName",
                table: "Products",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_Products_WorkshopId",
                table: "Products",
                column: "WorkshopId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_Code",
                table: "Roles",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_EntityStatus",
                table: "Roles",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_Name",
                table: "Roles",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_TranslatedName",
                table: "Roles",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_Code",
                table: "Shifts",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_EntityStatus",
                table: "Shifts",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_Name",
                table: "Shifts",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_TranslatedName",
                table: "Shifts",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCardItems_DefectId",
                table: "SummaryCardItems",
                column: "DefectId");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCardItems_EntityStatus",
                table: "SummaryCardItems",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCardItems_SummaryCardId",
                table: "SummaryCardItems",
                column: "SummaryCardId");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCards_EntityStatus",
                table: "SummaryCards",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCards_OperationId",
                table: "SummaryCards",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCards_ShiftId",
                table: "SummaryCards",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryCards_UserId",
                table: "SummaryCards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EntityStatus",
                table: "Users",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Users_LanguageId",
                table: "Users",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_Code",
                table: "Workshops",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_EntityStatus",
                table: "Workshops",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_Name",
                table: "Workshops",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_TranslatedName",
                table: "Workshops",
                column: "TranslatedName");

            migrationBuilder.CreateIndex(
                name: "IX_WorkshopUsers_EntityStatus",
                table: "WorkshopUsers",
                column: "EntityStatus");

            migrationBuilder.CreateIndex(
                name: "IX_WorkshopUsers_UserId",
                table: "WorkshopUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkshopUsers_WorkshopId",
                table: "WorkshopUsers",
                column: "WorkshopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditLogProperties");

            migrationBuilder.DropTable(
                name: "EntityGroupRelations");

            migrationBuilder.DropTable(
                name: "MenuRoles");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "SummaryCardItems");

            migrationBuilder.DropTable(
                name: "WorkshopUsers");

            migrationBuilder.DropTable(
                name: "AuditLogEntities");

            migrationBuilder.DropTable(
                name: "EntityGroups");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "Defects");

            migrationBuilder.DropTable(
                name: "SummaryCards");

            migrationBuilder.DropTable(
                name: "Operations");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Workshops");
        }
    }
}
