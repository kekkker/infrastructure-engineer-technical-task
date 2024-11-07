import { computeFirewall } from "@cdktf/provider-google";
import { Construct } from "constructs";
import { computeNetwork } from "@cdktf/provider-google";

export function setupGKEFirewalls(scope: Construct, network: computeNetwork.ComputeNetwork) {
    // VPN Access to GKE
    new computeFirewall.ComputeFirewall(scope, "gkeVpnAccess", {
        network: network.name,
        name: "allow-vpn",
        allow: [{ protocol: "tcp", ports: [] }],
        sourceRanges: ["10.26.32.12/32", "19.104.105.29/32"],
        targetTags: ["gke-cluster"],
    });

    // HTTPS Access from Anywhere
    new computeFirewall.ComputeFirewall(scope, "gkeHttpsAccess", {
        network: network.name,
        name: "allow-https",
        allow: [{ protocol: "tcp", ports: ["443"] }],
        sourceRanges: ["0.0.0.0/0"],
        targetTags: ["gke-cluster"],
    });
}
