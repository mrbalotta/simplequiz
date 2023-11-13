import { DIContainer, DIMapper } from "@infra/di/api";
import { NavigationMapper } from "@infra/navigation/api/mapper/NavigationMapper";
import { PlaySessionScreen } from "../impl/view/screens/PlaySessionScreen";
import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";
import { PlayNavigationImpl } from "../impl/interactors/PlayNavigationImpl";
import { Navigator } from "@infra/navigation/api/client/Navigator";

export default function main(di: DIContainer & DIMapper) {
    const navMapper = di.inject<NavigationMapper>("NavigationMapper");
    navMapper.addScreen(new ScreenInfo("quiz/play/session", PlaySessionScreen))

    const factory = () => {
        const navigator = di.inject<Navigator>("Navigator")
        return new PlayNavigationImpl(navigator)
    }
    
    di.single("PlayNavigation", factory)
}