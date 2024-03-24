import type { Settings } from "../models/settings.model";
import { atomWithLocalStorage } from "./atom-handler";

const initialData: Settings = {
	eventLimit: 20,
};

export const settingsAtom = atomWithLocalStorage(
	"camera-events-settings",
	initialData,
);
