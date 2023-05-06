import ColorStore from "./ColorStore";
import ModeStore from "./ModeStore";
import SelectedElements from "./SelectedElements";
import UserStore from "./UserStore";

export interface ContextType {
    user: UserStore;
    color: ColorStore;
    selectedElements: SelectedElements;
    mode: ModeStore;
}
