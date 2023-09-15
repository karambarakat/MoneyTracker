// reads the content of `bindings` directory and generates a types.ts with this line for each file:
// export type { <file_name> } from './bindings/<file_name>';
#[tokio::main]
async fn main() {
    let content = std::fs::read_dir("./apps/rust/bindings")
        .unwrap()
        .map(|entry| {
            let file_name = entry.unwrap().file_name().into_string().unwrap();
            let file_name = &file_name[..file_name.len() - 3];
            format!(
                "export type {{ {} }} from './bindings/{}';",
                file_name, file_name
            )
        })
        .collect::<Vec<String>>()
        .join("\n");

    std::fs::write("./apps/rust/types.ts", content).unwrap();
}
