---
title: "Doom in a Dish: How Brain Cells Mastered a Classic Shooter"
date: 2026-03-07
tag: artificial-intelligence
---

# Overview

Neural networks get their name from neurons, cells in our brain that learn patterns by forming connections with other neurons via [synaptogenesis](https://en.wikipedia.org/wiki/Synaptogenesis).

Modern AI systems have taken inspiration from this with artificial neural networks. But what happens if we try to 'train' biological neurons much the way we train artificial ones?

That's what a team at Cortical Labs, an Australian biotech firm, has been up to. They recently trained 200,000 living human brain cells, grown on a microelectrode array chip called the CL-1, to play the 1993 video game _Doom_.

# Core Mechanism

The system translates Doom's video feed into electrical stimulation patterns sent to the neurons via the chip's electrodes, mimicking sensory input since the cells lack eyes. The neurons respond with their own electrical spikes, which the chip decodes into game actions like moving, turning, or shooting—specific firing patterns trigger Doomguy's controls.

Feedback loops reinforce useful patterns: successful actions (e.g., hitting enemies) yield positive signals, while failures provide negative ones, enabling adaptive learning akin to biological reinforcement learning without traditional AI algorithms.

# RL

It's not traditional RL with math like Q-learning or policy gradients; instead, the neurons' inherent plasticity handles the "algorithm" through real-time sensory-motor loops, akin to natural RL in brains where prediction errors shape synapses.

# So what?

TBH, we don't quite know how impactful this is yet. The field of "Wetware-as-a-service" is still super new and niche. But our brain is [way more efficient](https://x.com/krishdotdev/status/2030376646138798111?s=20) than modern compute (W vs MW). We'll see if scaling laws apply here.

# Central Intelligence

I also just found out that Cortical Labs is backed by In-Q-Tel, the CIA's venture capital arm. Cool.
