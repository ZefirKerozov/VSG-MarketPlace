using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(20230528)]

public class LogTable :Migration
{
    public override void Up()
    {
        Create.Table("Logs")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("CreatedOn").AsDateTime().NotNullable()
            .WithColumn("Message").AsString().NotNullable()
            .WithColumn("Level").AsString(50).NotNullable()
            .WithColumn("StackTrace").AsString().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Logs");
    }
}