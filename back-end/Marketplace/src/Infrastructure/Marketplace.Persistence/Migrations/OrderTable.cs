using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(20230527)]

public class OrderTable :Migration
{
    public override void Up()
    {
        Create.Table("Order")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("Status").AsString(255).NotNullable()
            .WithColumn("Quantity").AsInt64().NotNullable()
            .WithColumn("OrderDate").AsDateTime().NotNullable()
            .WithColumn("ProductId").AsInt64().Nullable()
            .WithColumn("UserId").AsInt64().NotNullable()
            .WithColumn("Name").AsString(255).NotNullable()
            .WithColumn("Code").AsString(255).NotNullable()
            .WithColumn("Price").AsDecimal().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Order");
    }
}