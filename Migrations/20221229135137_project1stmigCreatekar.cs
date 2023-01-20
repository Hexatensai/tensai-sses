using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations
{
    /// <inheritdoc />
    public partial class project1stmigCreatekar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "project_main",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    updatedon = table.Column<DateTime>(name: "updated_on", type: "timestamp with time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    scmtool = table.Column<string>(name: "scm_tool", type: "text", nullable: false),
                    build = table.Column<string>(type: "text", nullable: false),
                    codeanalysis = table.Column<string>(name: "code_analysis", type: "text", nullable: false),
                    dependencycheck = table.Column<string>(name: "dependency_check", type: "text", nullable: false),
                    artifactory = table.Column<string>(type: "text", nullable: false),
                    sast = table.Column<string>(type: "text", nullable: false),
                    dast = table.Column<string>(type: "text", nullable: false),
                    deploy = table.Column<bool>(type: "boolean", nullable: false),
                    updatedbyid = table.Column<int>(name: "updated_by_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_project_main", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_project_main_name",
                table: "project_main",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "project_main");
        }
    }
}
