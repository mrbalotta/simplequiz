import { DIContainer } from "@infra/di/api";
import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";
import { NavigationMapper } from "@infra/navigation/api/mapper/NavigationMapper";
import { LobbyScreen } from "@quiz/play/impl/view/screens/LobbyScreen";

export default function main(di: DIContainer) {
    const navMapper = di.inject<NavigationMapper>("NavigationMapper");
    navMapper.addScreen(new ScreenInfo("quiz/play/lobby", LobbyScreen))
}