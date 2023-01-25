using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations.ProjectDB
{
    /// <inheritdoc />
    public partial class project4thmigCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CICD",
                table: "project_main",
                type: "text",
                nullable: false,
                defaultValue: "");
   
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "CICD",
                table: "project_main");
        }
    }
}
