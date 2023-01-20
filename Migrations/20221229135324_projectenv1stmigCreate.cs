using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations
{
    /// <inheritdoc />
    public partial class projectenv1stmigCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "project_environments",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    updatedon = table.Column<DateTime>(name: "updated_on", type: "timestamp with time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    updatedbyid = table.Column<int>(name: "updated_by_id", type: "integer", nullable: false),
                    envid = table.Column<int>(name: "env_id", type: "integer", nullable: false),
                    projectid = table.Column<int>(name: "project_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_project_environments", x => x.id);
                    table.ForeignKey(
                        name: "FK_project_environments_Environments_env_id",
                        column: x => x.envid,
                        principalTable: "deployable_environments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_project_environments_Project_project_id",
                        column: x => x.projectid,
                        principalTable: "project_main",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });


            migrationBuilder.CreateIndex(
                name: "IX_project_environments_env_id",
                table: "project_environments",
                column: "env_id");

            migrationBuilder.CreateIndex(
                name: "IX_project_environments_name",
                table: "project_environments",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_project_environments_project_id",
                table: "project_environments",
                column: "project_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "project_environments");
        }
    }
}
