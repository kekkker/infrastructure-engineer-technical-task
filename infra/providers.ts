import { provider } from "@cdktf/provider-google";
import { Construct } from "constructs";

export function setupProvider(scope: Construct, project: string, region: string, zone: string) {
    return new provider.GoogleProvider(scope, "Google", {
        project: project,
        region: region,
        zone: zone,
    });
}
