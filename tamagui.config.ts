import { createTamagui } from 'tamagui';
import {config} from "@tamagui/config";

const appConfig = createTamagui(config);

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;