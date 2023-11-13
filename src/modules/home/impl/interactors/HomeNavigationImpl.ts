import { Navigator } from "@infra/navigation/api/client/Navigator";
import { HomeNavigation } from "@quiz/home/api/HomeNavigation";

export class HomeNavigationImpl implements HomeNavigation {

    constructor(private navigator: Navigator) {}

    navigate(): void {
        this.navigator.navigate("quiz/home")
    }
}