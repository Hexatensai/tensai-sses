using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations
{
    /// <inheritdoc />
    public partial class _7thCreate : Migration
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
                    updatedon = table.Column<string>(name: "updated_on", type: "text", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    updatedbyid = table.Column<int>(name: "updated_by_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pipeline_stages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "StageTools",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    updateon = table.Column<string>(name: "update_on", type: "text", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(name: "is_active", type: "boolean", nullable: false),
                    accessurl = table.Column<string>(name: "access_url", type: "text", nullable: false),
                    credtype = table.Column<string>(name: "cred_type", type: "text", nullable: false),
                    creduser = table.Column<string>(name: "cred_user", type: "text", nullable: false),
                    credsecret = table.Column<string>(name: "cred_secret", type: "text", nullable: false),
                    stageid = table.Column<int>(name: "stage_id", type: "integer", nullable: false),
                    PipelineStagesid = table.Column<int>(type: "integer", nullable: false),
                    toolid = table.Column<string>(name: "tool_id", type: "text", nullable: false),
                    updatedbyid = table.Column<int>(name: "updated_by_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StageTools", x => x.id);
                    table.ForeignKey(
                        name: "FK_StageTools_pipeline_stages_PipelineStagesid",
                        column: x => x.PipelineStagesid,
                        principalTable: "pipeline_stages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StageTools_PipelineStagesid",
                table: "StageTools",
                column: "PipelineStagesid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StageTools");

            migrationBuilder.DropTable(
                name: "pipeline_stages");
        }
    }
}
