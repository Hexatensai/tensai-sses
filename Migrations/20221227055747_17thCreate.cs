using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tensaisses.Migrations.StageToolsDb
{
    /// <inheritdoc />
    public partial class _17thCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stages_tools_pipeline_stages_pipeline_stagesid",
                table: "stages_tools");

            // migrationBuilder.DropIndex(
            //     name: "IX_stages_tools_stage_id",
            //     table: "stages_tools");

            // migrationBuilder.AddColumn<int>(
            //     name: "stage_id",
            //     table: "stages_tools",
            //     type: "integer",
            //     nullable: false,
            //     defaultValue: 0);

            // migrationBuilder.CreateIndex(
            //     name: "IX_stages_tools_stage_id",
            //     table: "stages_tools",
            //     column: "stage_id");

            migrationBuilder.AddForeignKey(
                name: "FK_stages_tools_pipeline_stages_stage_id",
                table: "stages_tools",
                column: "stage_id",
                principalTable: "pipeline_stages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stages_tools_pipeline_stages_pipeline_stagesid",
                table: "stages_tools");

            // migrationBuilder.DropIndex(
            //     name: "IX_stages_tools_stage_id",
            //     table: "stages_tools");

            // migrationBuilder.DropColumn(
            //     name: "stage_id",
            //     table: "stages_tools");

            // migrationBuilder.CreateIndex(
            //     name: "IX_stages_tools_stage_id",
            //     table: "stages_tools",
            //     column: "stage_id");

            migrationBuilder.AddForeignKey(
                name: "FK_stages_tools_pipeline_stages_stage_id",
                table: "stages_tools",
                column: "stage_id",
                principalTable: "pipeline_stages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
