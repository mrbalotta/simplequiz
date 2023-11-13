import { DIContainer, DIMapper } from "@infra/di/api";
import { Navigator } from "@infra/navigation/api/client/Navigator";
import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";
import { NavigationMapper } from "@infra/navigation/api/mapper/NavigationMapper";

import { HomeScreen } from "@quiz/home/impl/view/screens/HomeScreen";
import { HomeNavigationImpl } from "../impl/interactors/HomeNavigationImpl";


export default function main(di: DIContainer & DIMapper) {
    const navMapper = di.inject<NavigationMapper>("NavigationMapper");
    navMapper.addScreen(new ScreenInfo("quiz/home", HomeScreen))

    const factory = () => {
        const navigator = di.inject<Navigator>("Navigator")
        return new HomeNavigationImpl(navigator)
    }
    
    di.single("HomeNavigation", factory)
}