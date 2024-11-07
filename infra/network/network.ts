import { computeNetwork } from "@cdktf/provider-google";
import { Construct } from "constructs";

export function createNetwork(scope: Construct, networkName: string) {
    return new computeNetwork.ComputeNetwork(scope, "network", {
        name: networkName,
        autoCreateSubnetworks: true,
    });
}
