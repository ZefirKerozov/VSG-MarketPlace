using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(20230525)]

public class ImageTable :Migration
{
    public override void Up()
    {
        Create.Table("Images")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("img").AsString().NotNullable()
            .WithColumn("PriductId").AsInt64().NotNullable().ForeignKey("Products","Id");
    }

    public override void Down()
    {
        Delete.Table("Images");
    }
}