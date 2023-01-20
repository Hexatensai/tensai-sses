using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tensaisses.Migrations.ProjectDB
{
    /// <inheritdoc />
    public partial class project2stmigCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "project_deploy_env",
                table: "project_main",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "project_deploy_env",
                table: "project_main");
        }
    }
}
