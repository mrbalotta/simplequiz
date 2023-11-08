import { DIContainer } from "@infra/di/api";
import { NavigationMapper } from "@infra/navigation/api/mapper/NavigationMapper";
import { PlaySessionScreen } from "../impl/view/screens/PlaySessionScreen";
import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";

export default function main(di: DIContainer) {
    const navMapper = di.inject<NavigationMapper>("NavigationMapper");
    navMapper.addScreen(new ScreenInfo("quiz/play/session", PlaySessionScreen))
}