using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations
{
    /// <inheritdoc />
    public partial class _1stmigstagetoolCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pipeline_stages",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    updatedon = table.Column<DateTime>(name: "updated_on", type: "timestamp with time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    updatedbyid = table.Column<int>(name: "updated_by_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipelineStages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tensai_supported_tools",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    updatedon = table.Column<DateTime>(name: "updated_on", type: "timestamp with time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTools", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "stages_tools_mapping",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    updatedon = table.Column<DateTime>(name: "updated_on", type: "timestamp with time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    accessurl = table.Column<string>(name: "access_url", type: "text", nullable: false),
                    credtype = table.Column<string>(name: "cred_type", type: "text", nullable: false),
                    creduser = table.Column<string>(name: "cred_user", type: "text", nullable: false),
                    credsecret = table.Column<string>(name: "cred_secret", type: "text", nullable: false),
                    updatedbyid = table.Column<int>(name: "updated_by_id", type: "integer", nullable: false),
                    stageid = table.Column<int>(name: "stage_id", type: "integer", nullable: false),
                    toolid = table.Column<int>(name: "tool_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stages_tools_mapping", x => x.id);
                    table.ForeignKey(
                        name: "FK_stages_tools_mapping_PipelineStages_stage_id",
                        column: x => x.stageid,
                        principalTable: "pipeline_stages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_stages_tools_mapping_SupportTools_tool_id",
                        column: x => x.toolid,
                        principalTable: "tensai_supported_tools",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_stages_tools_mapping_name",
                table: "stages_tools_mapping",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_stages_tools_mapping_stage_id",
                table: "stages_tools_mapping",
                column: "stage_id");

            migrationBuilder.CreateIndex(
                name: "IX_stages_tools_mapping_tool_id",
                table: "stages_tools_mapping",
                column: "tool_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "stages_tools_mapping");

            migrationBuilder.DropTable(
                name: "pipeline_stages");

            migrationBuilder.DropTable(
                name: "tensai_supported_tools");
        }
    }
}
