Option Explicit
Dim shell, fs, folder, command
Set shell = CreateObject("WScript.Shell")
Set fs = CreateObject("Scripting.FileSystemObject")
folder = fs.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = folder
command = "pythonw.exe """ & fs.BuildPath(folder, "sync_reader.py") & """ --open"
On Error Resume Next
shell.Run command, 0, False
If Err.Number <> 0 Then MsgBox "Cannot start the reader. Python 3 is required. You can still open index.html.", 48, "Reader"
