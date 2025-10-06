"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class HeadingLinkAliasPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Loading Heading Link Alias Plugin");
            // Register an editor change handler
            this.registerEvent(this.app.workspace.on("editor-change", (editor) => {
                this.handleEditorChange(editor);
            }));
        });
    }
    handleEditorChange(editor) {
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
            editor.replaceRange(aliasText, { line: cursor.line, ch: insertPos }, { line: cursor.line, ch: insertPos });
            // Move cursor to after the ]]
            editor.setCursor({
                line: cursor.line,
                ch: cursor.ch + aliasText.length,
            });
        }
    }
    onunload() {
        console.log("Unloading Heading Link Alias Plugin");
    }
}
exports.default = HeadingLinkAliasPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBc0U7QUFFdEUsTUFBcUIsc0JBQXVCLFNBQVEsaUJBQU07SUFDbEQsTUFBTTs7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFFakQsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxhQUFhLENBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDO0tBQUE7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjO1FBQy9CLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QyxpRUFBaUU7UUFDakUsK0RBQStEO1FBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsRCxnRUFBZ0U7UUFDaEUsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRWpFLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsb0NBQW9DO1lBQ3BDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLHVCQUF1QjthQUNoQztZQUVELDZDQUE2QztZQUM3QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDaEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7WUFFdEQsNkJBQTZCO1lBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFFaEMsTUFBTSxDQUFDLFlBQVksQ0FDakIsU0FBUyxFQUNULEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUNwQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FDckMsQ0FBQztZQUVGLDhCQUE4QjtZQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNmLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU07YUFDakMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUF6REQseUNBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luLCBFZGl0b3IsIE1hcmtkb3duVmlldywgRWRpdG9yQ2hhbmdlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRpbmdMaW5rQWxpYXNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coXCJMb2FkaW5nIEhlYWRpbmcgTGluayBBbGlhcyBQbHVnaW5cIik7XG5cbiAgICAvLyBSZWdpc3RlciBhbiBlZGl0b3IgY2hhbmdlIGhhbmRsZXJcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJlZGl0b3ItY2hhbmdlXCIsIChlZGl0b3I6IEVkaXRvcikgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUVkaXRvckNoYW5nZShlZGl0b3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlRWRpdG9yQ2hhbmdlKGVkaXRvcjogRWRpdG9yKTogdm9pZCB7XG4gICAgY29uc3QgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xuICAgIGNvbnN0IGxpbmUgPSBlZGl0b3IuZ2V0TGluZShjdXJzb3IubGluZSk7XG5cbiAgICAvLyBMb29rIGZvciBhIGhlYWRpbmcgbGluayB0aGF0IHdhcyBqdXN0IGNvbXBsZXRlZCAobm8gYWxpYXMgeWV0KVxuICAgIC8vIFBhdHRlcm46IFtbZmlsZW5hbWUjaGVhZGluZ11dIHdoZXJlIGN1cnNvciBpcyByaWdodCBhZnRlciBdXVxuICAgIGNvbnN0IGJlZm9yZUN1cnNvciA9IGxpbmUuc3Vic3RyaW5nKDAsIGN1cnNvci5jaCk7XG5cbiAgICAvLyBNYXRjaCBbW2FueXRoaW5nI2hlYWRpbmddXSBidXQgbm90IFtbYW55dGhpbmcjaGVhZGluZ3xhbGlhc11dXG4gICAgY29uc3QgbWF0Y2ggPSBiZWZvcmVDdXJzb3IubWF0Y2goL1xcW1xcWyhbXlxcXXxdKykjKFteXFxdfF0rKVxcXVxcXSQvKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgY29uc3QgZnVsbE1hdGNoID0gbWF0Y2hbMF07XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IG1hdGNoWzFdO1xuICAgICAgY29uc3QgaGVhZGluZyA9IG1hdGNoWzJdO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGVyZSdzIGFscmVhZHkgYW4gYWxpYXNcbiAgICAgIGlmIChmdWxsTWF0Y2guaW5jbHVkZXMoXCJ8XCIpKSB7XG4gICAgICAgIHJldHVybjsgLy8gQWxyZWFkeSBoYXMgYW4gYWxpYXNcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIGFsaWFzXG4gICAgICBjb25zdCBtYXRjaFN0YXJ0ID0gY3Vyc29yLmNoIC0gZnVsbE1hdGNoLmxlbmd0aDtcbiAgICAgIGNvbnN0IGluc2VydFBvcyA9IGN1cnNvci5jaCAtIDI7IC8vIFBvc2l0aW9uIGJlZm9yZSBdXVxuXG4gICAgICAvLyBJbnNlcnQgdGhlIGFsaWFzOiB8aGVhZGluZ1xuICAgICAgY29uc3QgYWxpYXNUZXh0ID0gYHwke2hlYWRpbmd9YDtcblxuICAgICAgZWRpdG9yLnJlcGxhY2VSYW5nZShcbiAgICAgICAgYWxpYXNUZXh0LFxuICAgICAgICB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogaW5zZXJ0UG9zIH0sXG4gICAgICAgIHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBpbnNlcnRQb3MgfVxuICAgICAgKTtcblxuICAgICAgLy8gTW92ZSBjdXJzb3IgdG8gYWZ0ZXIgdGhlIF1dXG4gICAgICBlZGl0b3Iuc2V0Q3Vyc29yKHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNoOiBjdXJzb3IuY2ggKyBhbGlhc1RleHQubGVuZ3RoLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb251bmxvYWQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJVbmxvYWRpbmcgSGVhZGluZyBMaW5rIEFsaWFzIFBsdWdpblwiKTtcbiAgfVxufVxuIl19