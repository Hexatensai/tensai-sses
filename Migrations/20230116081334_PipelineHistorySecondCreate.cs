using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tensaisses.Migrations.PipelineHistoryDb
{
    /// <inheritdoc />
    public partial class PipelineHistorySecondCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status_code",
                table: "pipeline_history",
                newName: "build_number");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "build_number",
                table: "pipeline_history",
                newName: "status_code");
        }
    }
}
