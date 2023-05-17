using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(2023052805)]

public class _05_LogTable :Migration
{
    public override void Up()
    {
        Create.Table("Log")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("CreatedOn").AsDateTime().NotNullable()
            .WithColumn("Message").AsString().NotNullable()
            .WithColumn("Level").AsString(50).NotNullable()
            .WithColumn("StackTrace").AsString().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Log");
    }
}