using FluentMigrator;
using Markerplace.Domain.Entities;

namespace Marketplace.Persistence.Migrations;

[Migration(20230523)]
public class CategoryTable :Migration
{
    public override void Up()
    {
        Create.Table("Categories")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("Name").AsString(50).NotNullable();

        Insert.IntoTable("Categories").Row(new { Name = "Laptops" });
        Insert.IntoTable("Categories").Row(new { Name = "Monitors" });
        Insert.IntoTable("Categories").Row(new { Name = "Chairs" });
        Insert.IntoTable("Categories").Row(new { Name = "Keyboards" });
        Insert.IntoTable("Categories").Row(new { Name = "Mouses" });
        Insert.IntoTable("Categories").Row(new { Name = "Mouse pads" });
    }

    public override void Down()
    {
        Delete.Table("Categories");
    }
}