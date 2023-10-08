// reads the content of `bindings` directory and generates a types.ts with this line for each file:
// export type { <file_name> } from './bindings/<file_name>';
#[tokio::main]
async fn main() {
    let content = std::fs::read_dir("./apps/rust/bindings")
        .expect("run cargo test in order for tsrs to generate ./app/rust/bindings")
        .map(|entry| {
            let file_name = entry.unwrap().file_name().into_string().unwrap();
            let file_name = &file_name[..file_name.len() - 3];
            format!(
                "export type {{ {} }} from './bindings/{}';",
                file_name, file_name
            )
        });

    let mut content = content.collect::<Vec<String>>().join("\n");

    content.insert_str(
        0,
        "// auto generate by export_bindings do not edit directly! \n\n",
    );

    std::fs::write("./apps/rust/types.ts", content).unwrap();
}
