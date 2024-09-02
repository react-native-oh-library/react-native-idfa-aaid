import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import { abilityAccessCtrl, Permissions, bundleManager, common } from '@kit.AbilityKit';
import { identifier } from '@kit.AdsKit';

export type AdvertisingInfoResponse = {
  id: string | null;
  isAdTrackingLimited: boolean;
};

const permission = 'ohos.permission.APP_TRACKING_CONSENT';

async function getAccessTokenID(): Promise<number> {
  try {
    const bundleInfo: bundleManager.BundleInfo =
      await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
    const appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
    return appInfo.accessTokenId;
  } catch (error) {
    throw new Error(`Error getting AccessToken ID: ${error}`);
  }
}

async function checkPermissionGrant(tokenId: number, permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
  const atManager = abilityAccessCtrl.createAtManager();
  return await atManager.checkAccessToken(tokenId, permission);
}

async function requestPermission(context: common.UIAbilityContext, permission: Permissions): Promise<void> {
  const atManager = abilityAccessCtrl.createAtManager();
  await atManager.requestPermissionsFromUser(context, [permission]);
}

async function obtainingPermissions(tokenId: number): Promise<string | null> {
  try {
    const oaid = await identifier.getOAID();
    return oaid;
  } catch (error) {
    console.error('Error retrieving OAID:', error);
    return null;
  }
}

async function ModuleImplementation(context): Promise<AdvertisingInfoResponse> {
  let result: AdvertisingInfoResponse = { id: null, isAdTrackingLimited: true };
  try {
    const tokenId = await getAccessTokenID();
    let isAdTrackingLimited = false;

    const permissionStatus = await checkPermissionGrant(tokenId, permission);
    if (permissionStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      try {
        await requestPermission(context, permission);
        const newPermissionStatus = await checkPermissionGrant(tokenId, permission);
        if (newPermissionStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
          isAdTrackingLimited = true;
        }
      } catch (error) {
        console.error('Permission request failed:', error);
        isAdTrackingLimited = true;
      }
    }
    const oaid = await obtainingPermissions(tokenId);
    result.id = oaid;
    result.isAdTrackingLimited = isAdTrackingLimited;
    return result;
  } catch (error) {
    console.error('Error getting OAID with permission:', error);
    return result;
  }
}

export class GetOaidModule extends TurboModule implements TM.RTNGetOaidNativeModule.Spec {
  private context: common.UIAbilityContext = this.ctx.uiAbilityContext;

  async getAdvertisingInfo(): Promise<AdvertisingInfoResponse> {
    return ModuleImplementation(this.context);
  }

  async getAdvertisingInfoAndCheckAuthorization(check: boolean): Promise<AdvertisingInfoResponse> {
    return ModuleImplementation(this.context);
  }
}





