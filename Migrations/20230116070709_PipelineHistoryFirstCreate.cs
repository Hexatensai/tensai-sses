using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations
{
    /// <inheritdoc />
    public partial class PipelineHistoryFirstCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pipeline_history",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    applicationURL = table.Column<string>(type: "text", nullable: false),
                    branchname = table.Column<string>(name: "branch_name", type: "text", nullable: false),
                    environmentname = table.Column<string>(name: "environment_name", type: "text", nullable: false),
                    jobstatus = table.Column<string>(name: "job_status", type: "text", nullable: true),
                    statuscode = table.Column<int>(name: "status_code", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pipeline_history", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pipeline_history");
        }
    }
}
