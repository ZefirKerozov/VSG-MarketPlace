using FluentMigrator;
using Markerplace.Domain.Entities;

namespace Marketplace.Persistence.Migrations;

[Migration(20230523)]
public class CategoryTable :Migration
{
    public override void Up()
    {
        Create.Table("Category")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("Name").AsString(50).NotNullable();

        Insert.IntoTable("Category").Row(new { Name = "Laptops" });
        Insert.IntoTable("Category").Row(new { Name = "Monitors" });
        Insert.IntoTable("Category").Row(new { Name = "Chairs" });
        Insert.IntoTable("Category").Row(new { Name = "Keyboards" });
        Insert.IntoTable("Category").Row(new { Name = "Mouses" });
        Insert.IntoTable("Category").Row(new { Name = "Mouse pads" });
    }

    public override void Down()
    {
        Delete.Table("Category");
    }
}