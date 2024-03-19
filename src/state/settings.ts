import type { Settings } from "../models/settings.model";
import { atom } from "jotai";

const initialData: Settings = {
	eventLimit: 20,
};

const atomWithLocalStorage = (key: string, initialValue: unknown) => {
	const getInitialValue = () => {
		const item = localStorage.getItem(key);
		if (item !== null) {
			return JSON.parse(item);
		}
		return initialValue;
	};
	const baseAtom = atom(getInitialValue());
	const derivedAtom = atom(
		(get) => get(baseAtom),
		(get, set, update) => {
			const nextValue =
				typeof update === "function" ? update(get(baseAtom)) : update;
			set(baseAtom, nextValue);
			localStorage.setItem(key, JSON.stringify(nextValue));
		},
	);
	return derivedAtom;
};

export const settingsAtom = atomWithLocalStorage(
	"camera-events-settings",
	initialData,
);
