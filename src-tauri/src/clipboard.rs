use std::sync::{LazyLock, Mutex};

use arboard::Clipboard;
use tauri::{AppHandle, Emitter};
use wayland_clipboard_listener::WlClipboardPasteStream;

static APP_HANDLER: LazyLock<Mutex<Option<AppHandle>>> = LazyLock::new(|| Mutex::new(None));

pub fn init(app_handle: tauri::AppHandle) {
    println!("App handle initialized!");
    APP_HANDLER.lock().unwrap().replace(app_handle);
}
pub fn spawn() {
    std::thread::spawn(move || {
        let mut clipboard = Clipboard::new().unwrap();
        let mut stream =
            WlClipboardPasteStream::init(wayland_clipboard_listener::WlListenType::ListenOnCopy)
                .unwrap();
        for _ in stream.paste_stream().flatten().flatten() {
            let app_handle = APP_HANDLER.lock().unwrap();
            let app_ref = app_handle.as_ref();
            match clipboard.get_text() {
                Ok(text) => match app_ref {
                    Some(app) => app
                        .emit("clipboard", text)
                        .expect("failed to emit clipboard event"),
                    _ => {}
                },
                _ => {}
            };
        }
    });
    std::thread::spawn(move || {
        // Defines the callback function to be called when the clipboard changes
        println!("listening for changes!");
        let callback = || {
            let mut clipboard = Clipboard::new().unwrap();
            let app_handle = APP_HANDLER.lock().unwrap();
            let app_ref = app_handle.as_ref();
            match clipboard.get_text() {
                Ok(text) => match app_ref {
                    Some(app) => app
                        .emit("clipboard", text)
                        .expect("failed to emit clipboard event"),
                    _ => {}
                },
                _ => {}
            };
        };

        // Starts the clipboard listener with the defined callback function
        if let Err(e) = clipboard_listener::listen_clipboard(Box::new(callback)) {
            // Prints an error message if the listener fails to start
            eprintln!("Error: {}", e);
        }
    });
}
