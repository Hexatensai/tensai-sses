using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tensaisses.Migrations.PipelineHistoryDb
{
    /// <inheritdoc />
    public partial class PipelineHistorythirdCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "applicationURL",
                table: "pipeline_history",
                newName: "scm_tool");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "scm_tool",
                table: "pipeline_history",
                newName: "applicationURL");
        }
    }
}
