import {
    RNPackage,
    TurboModulesFactory,
  } from "@rnoh/react-native-openharmony/ts";
  import type {
    TurboModule,
    TurboModuleContext,
  } from "@rnoh/react-native-openharmony/ts";
  import { TM } from "@rnoh/react-native-openharmony/generated/ts";
  import { GetOaidModule } from './GetOaidModule';
  
  class GetOaidModulesFactory extends TurboModulesFactory {
    createTurboModule(name: string): TurboModule | null {
      if (name === TM.RTNGetOaidNativeModule.NAME) {
        return new GetOaidModule(this.ctx);
      }
      return null;
    }

    hasTurboModule(name: string): boolean {
      return name === TM.RTNGetOaidNativeModule.NAME;
    }
  }
  
  export class GetOaidPackage extends RNPackage {
    createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
      return new GetOaidModulesFactory(ctx);
    }
  }