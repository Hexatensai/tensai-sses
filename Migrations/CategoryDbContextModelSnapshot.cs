﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace tensaisses.Migrations
{
    [DbContext(typeof(CategoryDbContext))]
    partial class CategoryDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("tensai_sses.Models.Category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<bool>("is_active")
                        .HasColumnType("boolean");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("updated_by_id")
                        .HasColumnType("integer");

                    b.Property<DateTime>("updated_on")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("version")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.HasIndex("name")
                        .IsUnique();

                    b.ToTable("Category");
                });
#pragma warning restore 612, 618
        }
    }
}
