import { Navigator } from "@infra/navigation/api/client/Navigator";
import { PlayNavigation } from "@quiz/play/api/PlayNavigation";

export class PlayNavigationImpl implements PlayNavigation {

    constructor(private navigator: Navigator) {}

    navigate(): void {
        this.navigator.navigate("quiz/play/session")
    }
}