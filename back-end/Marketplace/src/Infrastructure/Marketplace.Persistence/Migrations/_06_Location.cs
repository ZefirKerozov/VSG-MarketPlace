using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(2023052806)]
public class _06_Location :Migration
{
    public override void Up()
    {
        Create.Table("Location")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("Name").AsString(50).NotNullable();
        
        Insert.IntoTable("Location").Row(new { Name = "Plovdiv" });
        Insert.IntoTable("Location").Row(new { Name = "Veliko Tarnovo" });
        Insert.IntoTable("Location").Row(new { Name = "Home" });
    }

    public override void Down()
    {
        Delete.Table("Location");
    }
}