YeastVar1011 portable workspace / Windows

1. Extract the WHOLE ZIP to a normal folder. Keep START.cmd, portable/ and dist/ together.
2. Double-click START.cmd. A browser opens only after the local data service is ready.
3. Optional: CREATE-SHORTCUT.cmd creates a desktop shortcut with absolute paths.
4. STOP.cmd stops only the service belonging to this extracted folder.

No Python, Node.js, administrator rights, external CDN or package installation is needed.
The included launcher uses Windows PowerShell and .NET already supplied with Windows.
It listens only on 127.0.0.1, chooses a free port, and reuses the same running instance.
Later launches reuse the saved port when available, preserving the browser origin.
The release ZIP includes a SHA-256 manifest. START checks its files before opening the site.
Chinese characters and spaces in the extracted folder name are supported.
You may start it from another working directory or a desktop shortcut.

Forward the COMPLETE ZIP, not index.html alone or your own desktop shortcut.
After moving a folder, recreate its shortcut. An old shortcut still points to the old folder.
Do not open START inside a ZIP preview; extract it first.
Keep the opened browser address; a direct file:// index.html may restrict ES modules/fetch.

Important: a plan saved in browser local storage belongs to that browser and local origin.
Export the plan JSON before stopping/moving the package or changing computers.
Reimport that JSON in the new session. Browser security settings are not changed by START.

If START reports an error, its message gives the log location under:
%LOCALAPPDATA%\YeastVar1011\portable\<folder-id>\server.log
Each copy has its own log and authenticated stop endpoint. STOP never scans/kills ports.
Corporate policy may prohibit PowerShell; use the hosted site in that environment.

V18 experience update
Classic mode provides section shortcuts, filter clearing and persistent step navigation.
The optional immersive mode uses a liquid scene and six distinct camera framings. Both modes share the same saved plan and preserve the selected stage. Reduced motion pauses scene animation.

V19: selections now drive record-specific visual feedback, with distinct remove/inspect/filter responses. Chapter changes coordinate panel retraction, live camera movement and panel reveal. Local data management offers interface reset, temporary-view cleanup and explicitly confirmed full app-data deletion. Plan backups exclude separate notes, feedback, companion media and connection settings.
