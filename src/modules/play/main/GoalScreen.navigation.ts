import { DIContainer } from "@infra/di/api";
import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";
import { NavigationMapper } from "@infra/navigation/api/mapper/NavigationMapper";
import { GoalScreen } from "../impl/view/screens/GoalScreen";

export default function main(di: DIContainer) {
    const navMapper = di.inject<NavigationMapper>("NavigationMapper");
    navMapper.addScreen(new ScreenInfo("quiz/play/goals", GoalScreen))
}