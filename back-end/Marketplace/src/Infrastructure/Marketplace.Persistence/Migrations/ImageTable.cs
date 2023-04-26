using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(20230525)]

public class ImageTable :Migration
{
    public override void Up()
    {
        Create.Table("Image")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("img").AsString().NotNullable()
            .WithColumn("ProductId").AsInt64().NotNullable().ForeignKey("Product","Id");
    }

    public override void Down()
    {
        Delete.Table("Image");
    }
}