import { sqlUser } from "@cdktf/provider-google";
import { Construct } from "constructs";
import { sqlDatabaseInstance } from "@cdktf/provider-google";

export function createCloudSQLUser(scope: Construct, instance: sqlDatabaseInstance.SqlDatabaseInstance) {
    return new sqlUser.SqlUser(scope, "sqlUser", {
        instance: instance.name,
        name: "sqladmin",
        password: "secure-password",
    });
}
