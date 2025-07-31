<script lang="ts">
	let {
		buttonOutlineColor = 'var(--green)',
		buttonBackgroundColor = 'var(--white)',
		text,
		onClick
	}: {
		buttonOutlineColor?: string;
		buttonBackgroundColor?: string;
		text: string;
		onClick: () => void;
	} = $props();
</script>

<div class="button-parent">
	<div class="scooped-box button-outline" style:--button-outline-color={buttonOutlineColor}>
		<button class="scooped-box button" style:--button-bg={buttonBackgroundColor} onclick={onClick}>
			{text}
		</button>
	</div>
</div>

<style lang="scss">
	$scoopRadius: 12;
	$outlineWidth: 3;

	button {
		border: none;
	}

	.button-parent {
		position: relative;
	}

	.button-outline {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: $outlineWidth + px;
		background-color: var(--button-outline-color);
	}

	.button {
		padding: 1.5em 2.5em;
		width: 100%;
		background-color: var(--button-bg);
		transition: background-color 250ms ease-in-out;
	}

	.button:hover {
		background-color: var(--button-outline-color);
	}

	.scooped-box {
		$radius: $scoopRadius + px;
		mask: radial-gradient(
				#{$radius} at #{$radius} #{$radius},
				#0000 98%,
				#000
			) -#{$radius} -#{$radius};
	}
</style>
