import { App, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { setupProvider } from "./providers";
import { createNetwork } from "./network/network";
import { setupGKEFirewalls } from "./gke/firewall";
import { createGKECluster } from "./gke/cluster";
import { createCloudSQL } from "./cloud_sql/instance";
import { createCloudSQLUser } from "./cloud_sql/user";
import { config } from "./config"

class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        setupProvider(this, config.project, config.region, config.zone);

        const network = createNetwork(this, config.networkName);

        setupGKEFirewalls(this, network);

        const gkeCluster = createGKECluster(this, network, config.clusterName, config.zone, config.initialNodeCount, config.machineType);
        console.log(gkeCluster)

        const sqlInstance = createCloudSQL(this, config.sqlName, config.sqlTier, config.databaseVersion, config.region);
        createCloudSQLUser(this, sqlInstance);
    }
}

const app = new App();
new MyStack(app, "google-cloud-iac");
app.synth();
