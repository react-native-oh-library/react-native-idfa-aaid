import { TurboModuleRegistry } from 'react-native';

export type AdvertisingInfoResponse = {
  id: string | null;
  isAdTrackingLimited: boolean;
};

type ReactNativeIdfaAaidType = {
  getAdvertisingInfo(): Promise<AdvertisingInfoResponse>;
  getAdvertisingInfoAndCheckAuthorization(
    check: boolean
  ): Promise<AdvertisingInfoResponse>;
};
const ReactNativeIdfaAaid = TurboModuleRegistry.get('RTNGetOaidNativeModule');

export default ReactNativeIdfaAaid as ReactNativeIdfaAaidType;

