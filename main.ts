import { Plugin, Editor, MarkdownView, EditorChange } from "obsidian";

export default class HeadingLinkAliasPlugin extends Plugin {
  async onload(): Promise<void> {
    console.log("Loading Heading Link Alias Plugin");

    // Register an editor change handler
    this.registerEvent(
      this.app.workspace.on("editor-change", (editor: Editor) => {
        this.handleEditorChange(editor);
      })
    );
  }

  handleEditorChange(editor: Editor): void {
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);

    // Look for a heading link that was just completed (no alias yet)
    // Pattern: [[filename#heading]] where cursor is right after ]]
    const beforeCursor = line.substring(0, cursor.ch);

    // Match [[anything#heading]] but not [[anything#heading|alias]]
    const match = beforeCursor.match(/\[\[([^\]|]+)#([^\]|]+)\]\]$/);

    if (match) {
      const fullMatch = match[0];
      const filename = match[1];
      const heading = match[2];

      // Check if there's already an alias
      if (fullMatch.includes("|")) {
        return; // Already has an alias
      }

      // Calculate the position to insert the alias
      const matchStart = cursor.ch - fullMatch.length;
      const insertPos = cursor.ch - 2; // Position before ]]

      // Insert the alias: |heading
      const aliasText = `|${heading}`;

      editor.replaceRange(
        aliasText,
        { line: cursor.line, ch: insertPos },
        { line: cursor.line, ch: insertPos }
      );

      // Move cursor to after the ]]
      editor.setCursor({
        line: cursor.line,
        ch: cursor.ch + aliasText.length,
      });
    }
  }

  onunload(): void {
    console.log("Unloading Heading Link Alias Plugin");
  }
}
