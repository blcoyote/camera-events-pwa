import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Navbar } from "./navbar";

const meta = {
    component: Navbar,
    args: {
        darId: "1234",
        backNavigationUrl: "/back",
        onSubmit: () => {
            console.log("submit");
        },
    },
    title: "Components/Navbar",

    decorators: [
        (Story) => {
            return <Story />;
        },
    ],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BackendValidationFailedStory: Story = {
    name: "[Test] Error: ",

    play: async ({ step }) => {
        // TODO: Implement user details form with Backend CPR Validation failure
        const body = within(document.body);
        await step("Enter CPR", async () => {
            const cprInput = await body.findByRole("textbox", {
                name: "CPR-nr. *",
            });
            await userEvent.type(cprInput, "1212121212");
        });
        await step("Submit", async () => {
            const submitButton = await body.findByRole("button", {
                name: "Næste",
            });
            await userEvent.click(submitButton);
        });
    },
};

