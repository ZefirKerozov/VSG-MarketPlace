using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(20230524)]
public class ProductTable :Migration
{
    public override void Up()
    {
        Create.Table("Product")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("Name").AsString(255).NotNullable()
            .WithColumn("Code").AsString(255).NotNullable()
            .WithColumn("Quantity").AsInt64().NotNullable()
            .WithColumn("Description").AsString().NotNullable()
            .WithColumn("QuantityForSale").AsInt64().NotNullable()
            .WithColumn("CategoryId").AsInt64().NotNullable().ForeignKey("Category", "Id")
            .WithColumn("Location").AsString().NotNullable()
            .WithColumn("Price").AsDecimal().NotNullable();

    }

    public override void Down()
    {
        Delete.Table("Product");
    }
}