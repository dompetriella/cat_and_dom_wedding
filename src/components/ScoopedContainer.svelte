<script lang="ts">
	let {
		outlineColor = 'var(--green)',
		backgroundColor = 'var(--light-green)'
	}: {
		outlineColor?: string;
		backgroundColor?: string;
	} = $props();
</script>

<div class="parent-container">
	<div class="scooped-box outline" style="background-color: {outlineColor};">
		<section class="scooped-box content" style="background-color: {backgroundColor}">
            <slot />
        </section>
	</div>
</div>

<style lang="scss">
	$scoopRadius: 12;
	$outlineWidth: 3;

	.parent-container {
		position: relative;
	}

	.outline {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: $outlineWidth + px;
	}

	.content {
		padding: 1em 2em;
		width: 100%;
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
