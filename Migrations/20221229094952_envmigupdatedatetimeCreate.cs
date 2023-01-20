using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tensaisses.Migrations.MyDb
{
    /// <inheritdoc />
    public partial class envmigupdatedatetimeCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "deployable_environments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "update_on",
                table: "deployable_environments",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "updated_by_id",
                table: "deployable_environments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "version",
                table: "deployable_environments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_deployable_environments_name",
                table: "deployable_environments",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_deployable_environments_name",
                table: "deployable_environments");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "deployable_environments");

            migrationBuilder.DropColumn(
                name: "update_on",
                table: "deployable_environments");

            migrationBuilder.DropColumn(
                name: "updated_by_id",
                table: "deployable_environments");

            migrationBuilder.DropColumn(
                name: "version",
                table: "deployable_environments");
        }
    }
}
