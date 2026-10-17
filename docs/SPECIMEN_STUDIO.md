# Yeast studio

The optional immersive workspace includes a live specimen studio. Select **Start immersive experience**, then **Yeast studio** below the specimen. Classic and immersive modes share the same research plan.

The studio provides three color presets, a free color picker, holographic and pearlescent finishes, and independent visibility controls for the cell wall, nucleus, vacuoles, and membrane/mitochondrial networks. Changes apply directly to the rendered specimen. The model preserves an authored budding-yeast outline and internal structures; appearance choices do not encode measurements or inferred cell states.

Greeting, light-pulse and orbit actions provide short previews. Automatic turntable rotation is optional and starts disabled. Pointer dragging and keyboard rotation interrupt the active preview. Arrow keys rotate the specimen; Home restores its view. Scene motion can be paused independently, and reduced-motion settings use static feedback. Hidden scenes stop drawing.

On larger screens, the studio sits beside the specimen. On small screens, it becomes a lower control deck with a compact specimen preview above it. The panel remains non-modal so that the specimen can still be rotated. Escape closes the studio, and navigation closes it automatically.

Appearance settings are stored locally under `yv.specimen.v23`. **Reset appearance** restores the studio defaults; **Local data management → Reset interface/model** includes these settings. The research plan and its export remain separate from visual customization. The studio supports Chinese, English, French, Spanish and Basque.

The rendering implementation uses the bundled Three.js runtime, procedural geometry and local shaders. No external model, texture service or additional account is required.
