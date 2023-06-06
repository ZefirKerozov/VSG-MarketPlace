﻿using FluentMigrator;

namespace Marketplace.Persistence.Migrations;

[Migration(2023052703)]

public class _03_OrderTable :Migration
{
    public override void Up()
    {
        Create.Table("Order")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity().NotNullable()
            .WithColumn("Status").AsString(255).NotNullable()
            .WithColumn("Quantity").AsInt64().NotNullable()
            .WithColumn("OrderDate").AsString(255).NotNullable()
            .WithColumn("ProductId").AsInt64().Nullable()
            .WithColumn("Email").AsString(255).NotNullable()
            .WithColumn("Name").AsString(255).NotNullable()
            .WithColumn("Code").AsString(255).NotNullable()
            .WithColumn("Price").AsDecimal().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Order");
    }
}