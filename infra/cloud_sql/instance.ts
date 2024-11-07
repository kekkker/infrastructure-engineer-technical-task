import { sqlDatabaseInstance } from "@cdktf/provider-google";
import { Construct } from "constructs";

export function createCloudSQL(scope: Construct, sqlName: string, sqlTier: string, databaseVersion: string, region: string) {
    return new sqlDatabaseInstance.SqlDatabaseInstance(scope, "cloudSqlInstance", {
        name: sqlName,
        databaseVersion: databaseVersion,
        region: region,
        settings: {
            tier: sqlTier,
        },
    });
}
