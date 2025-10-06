# Heading Link Alias

Automatically adds aliases to heading links in Obsidian, so they display as just the heading text instead of the full file path.

## Demo

![Demo](demo.gif)

## What it does

When you link to a heading, this plugin automatically adds the heading as an alias.

**Without the plugin:**

- You create: `[[My File#My Heading]]`
- It displays: "My File > My Heading"

**With the plugin:**

- You create: `[[My File#My Heading]]`
- It becomes: `[[My File#My Heading|My Heading]]`
- It displays: "My Heading"

## How to use

1. Create a link to a heading within another note. (`[[##]]` is a shortcut for headings.)
2. Select a heading from the autocomplete
3. Done! The alias is added automatically

## Installation

### From Community Plugins (Recommended)

1. Open Settings → Community Plugins
2. Disable Safe Mode
3. Click Browse and search for "Heading Link Alias"
4. Click Install, then Enable

### Manual Installation

1. Download the latest release from [GitHub](https://github.com/yourusername/obsidian-heading-link-alias/releases)
2. Extract the files into your vault's `.obsidian/plugins/heading-link-alias/` folder
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

## Support

Found a bug or have a feature request? [Open an issue](https://github.com/yourusername/obsidian-heading-link-alias/issues) on GitHub.
