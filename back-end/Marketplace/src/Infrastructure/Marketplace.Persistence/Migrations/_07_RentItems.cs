using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(2023053107)]
public class _07_RentItems :Migration
{
    public override void Up()
    {
        Create.Table("RentItems")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("OrderDate").AsDateTime().NotNullable()
            .WithColumn("Name").AsString(255).NotNullable()
            .WithColumn("Code").AsString(255).NotNullable()
            .WithColumn("EndDate").AsDateTime().Nullable()
            .WithColumn("Email").AsString(255).NotNullable()
            .WithColumn("Quantity").AsInt64().NotNullable()
            .WithColumn("ProductId").AsInt64().Nullable();

    }

    public override void Down()
    {
        Delete.Table("RentItems");
    }
}