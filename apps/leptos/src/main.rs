use leptos::*;

mod component;

fn main() {
    mount_to_body(|| {
        view! { <p>
        "Hello, world!"
        <component::counter::Counter />
        </p> }
    })
}
