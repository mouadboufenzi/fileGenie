import { Stack, Title, Text } from "@mantine/core";

export default function Error404() {
	return (
		<Stack 
			maw="700" ml="auto" mr="auto"
			h="100vh"
			justify="center"
			align="center"
		>
			<Title ta="center">404</Title>
			<Text>La page que vous cherchez est introuvable</Text>
		</Stack>
	)
}