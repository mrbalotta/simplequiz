import { Navigator } from "@infra/navigation/api/client/Navigator";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";
import { StackActions } from "@react-navigation/native";
import { NavRef } from "../tree/NavRef";

export class NavigatorImpl implements Navigator {
  static readonly stackActionsRef = StackActions;

  constructor(private groups: ScreenGroupsRepository) {}

  navigate(route: string, value?: any): void {
    if (NavRef.isReady()) {
      const info = this.groups.getScreenByRoute(route);
      if (info) {
        if (info.getGroupName() == "default" || info.getGroupName() == "overlay") NavRef.navigate(route, value);
        else
          NavRef.navigate(info.getGroupName(), {
            screen: info.getRoute(),
            params: { ...value },
          });
      } else {
       console.log(`no info found ${route}`);
      }
    } else {
      console.log("not ready")
    }
  }

  goBack(): void {
    if (NavRef.isReady()) {
      NavRef.goBack();
    }
  }

  addToStack(route: string, value?: any): void{
    const refStackActions = NavigatorImpl.stackActionsRef
    const pushAction = refStackActions.push(route, value);
    NavRef.dispatch(pushAction);
  }
}
