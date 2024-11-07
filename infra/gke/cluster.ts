import { containerCluster, containerNodePool } from "@cdktf/provider-google";
import { Construct } from "constructs";
import { computeNetwork } from "@cdktf/provider-google";

export function createGKECluster(scope: Construct, network: computeNetwork.ComputeNetwork, clusterName: string, location: string, initialNodeCount: number, machineType: string) {
    const cluster = new containerCluster.ContainerCluster(scope, "gkeCluster", {
        name: clusterName,
        location: location,
        network: network.selfLink,
        initialNodeCount: initialNodeCount,
        removeDefaultNodePool: true,
        privateClusterConfig: {
            enablePrivateNodes: true,
            masterIpv4CidrBlock: "172.16.0.0/28",
        },
        ipAllocationPolicy: {},
    });

    new containerNodePool.ContainerNodePool(scope, "nodePool", {
        cluster: cluster.name,
        initialNodeCount: 1,
        location: cluster.location,
        nodeConfig: {
            machineType: machineType,
        },
    });

    return cluster;
}
