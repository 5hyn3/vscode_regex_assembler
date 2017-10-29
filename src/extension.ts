'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    var RegexTrie = require('regex-trie');
    var trie = new RegexTrie();
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let add_text = vscode.commands.registerCommand('extension.AddText', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        trie.add(text);
    });
    context.subscriptions.push(add_text);

    let add_sigle_line_text = vscode.commands.registerCommand('extension.AddSingleLineTexts', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        var arr = text.split(/\r\n|\r|\n/);
        for (var i = 0; i < arr.length; i++) {
            trie.add(arr[i]);
        }
    });
    context.subscriptions.push(add_sigle_line_text);

    let assemble_regex = vscode.commands.registerCommand('extension.AssembleRegex', () => {
        var regex = trie.toString();
        vscode.window.showInformationMessage(regex);
    });
    context.subscriptions.push(assemble_regex);

    let clear_text = vscode.commands.registerCommand('extension.ClearText', () => {
        trie = new RegexTrie();
    });
    context.subscriptions.push(clear_text);
}

// this method is called when your extension is deactivated
export function deactivate() {
}