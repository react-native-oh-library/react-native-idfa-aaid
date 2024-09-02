import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
import { TurboModuleRegistry } from "react-native";


export interface Spec extends TurboModule {
  getAdvertisingInfo(): Promise<AdvertisingInfoResponse>;
  getAdvertisingInfoAndCheckAuthorization(check: boolean):Promise<AdvertisingInfoResponse>;
}
export default TurboModuleRegistry.get<Spec>("RTNGetOaidNativeModule") as Spec;