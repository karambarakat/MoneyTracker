use leptos::*;

#[component]
pub fn Counter() -> impl IntoView {
    let (count, set_count) = create_signal(0);

    view! {
        <button
            on:click=move |_| {
                set_count.set(count.get() + 1);
            }
        >
            "Click me: "
            {move || count.get()}
        </button>
    }
}
