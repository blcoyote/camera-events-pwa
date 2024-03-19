import { useAtom } from "jotai";
import { settingsAtom } from "../state/settings";

export const useSettings = () => {
	const [settings, setSettings] = useAtom(settingsAtom);

	const eventLimit = settings.eventLimit;
	const setEventLimit = (value: number) => {
		setSettings({ ...settings, eventLimit: value });
	};

	// handle setting settings properly
	return { eventLimit, setEventLimit };
};

export default useSettings;
