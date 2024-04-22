"use client";

import { useState, useEffect } from "react";

import { usePostHog } from "posthog-js/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SendHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import Icon from "@/components/icon";

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: "L'email doit être rempli." })
		.email("Ceci n'est pas un email valide."),
});

type Input = {
	email: string;
};

export default function BellMenuBtn() {
	const posthog = usePostHog();
	const [showSendMessage, setShowSendMessage] = useState<boolean>(false);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: Input) {
		await fetch("/api/store-email?email=" + values.email);
		setShowSendMessage(true);
		form.reset();
	}

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (showSendMessage) {
			timeoutId = setTimeout(() => {
				setShowSendMessage(false);
			}, 2000);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [showSendMessage]);

	useEffect(() => {
		if (!dialogOpen) {
			form.reset();
			setShowSendMessage(false);
		}
	}, [dialogOpen, form]);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger
				onClick={() => {
					posthog.capture("Menu button clicked", { $type: "Bell" });
				}}
			>
				<Icon iconLabel="bell" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Recevoir des nouvelles</DialogTitle>
					<DialogDescription>
						Pour avoir des nouvelles d'
						<span className="text-black font-bold">Aftercinema</span>, rentrez
						votre email ci-dessous !
					</DialogDescription>
				</DialogHeader>
				<div className="">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex items-center"
						>
							<div className="mr-2 grid flex-1 gap-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<div className="flex-col">
												<FormControl>
													<Input placeholder="moi@moi.moi" {...field} />
												</FormControl>
												<FormMessage className="fixed mt-[2px]" />
												{showSendMessage && (
													<p className="text-green-600 fixed mt-[2px] text-sm">
														Envoyé !
													</p>
												)}
											</div>
										</FormItem>
									)}
								/>
							</div>

							<Button type="submit" size="sm">
								<SendHorizontal
									size={25}
									strokeWidth={2.5}
									absoluteStrokeWidth
								/>
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
