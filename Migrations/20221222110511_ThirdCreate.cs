// using Microsoft.EntityFrameworkCore.Migrations;

// #nullable disable

// namespace tensaisses.Migrations
// {
//     /// <inheritdoc />
//     public partial class ThirdCreate : Migration
//     {
//         /// <inheritdoc />
//         protected override void Up(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.DropPrimaryKey(
//                 name: "PK_EnvironmentData",
//                 table: "EnvironmentData");

//             migrationBuilder.RenameTable(
//                 name: "EnvironmentData",
//                 newName: "deployable_environments");

//             migrationBuilder.AddPrimaryKey(
//                 name: "PK_deployable_environments",
//                 table: "deployable_environments",
//                 column: "id");
//         }

//         /// <inheritdoc />
//         protected override void Down(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.DropPrimaryKey(
//                 name: "PK_deployable_environments",
//                 table: "deployable_environments");

//             migrationBuilder.RenameTable(
//                 name: "deployable_environments",
//                 newName: "EnvironmentData");

//             migrationBuilder.AddPrimaryKey(
//                 name: "PK_EnvironmentData",
//                 table: "EnvironmentData",
//                 column: "id");
//         }
//     }
// }
