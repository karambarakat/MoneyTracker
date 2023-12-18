// look for all package.json file in all workspace and copy them to .devcontainer/meta

use std::fs;
use std::io::ErrorKind;
use std::io::{BufRead, BufReader};
use std::process::{exit, Command};

fn copy_file(file_name: &str) {
    let source = format!("{}", file_name);
    let destination = format!(".devcontainer/meta/rs/{}", file_name);

    fs::copy(&source, &destination).unwrap_or_else(|_| panic!("Failed to copy {}", file_name));
}

fn main() {
    let mut packages: Vec<String> = vec![];

    // find . -name Cargo.toml -printf '%h\n'

    let output = Command::new("find")
        .arg(".")
        .arg("-name")
        .arg("Cargo.toml")
        .arg("-printf")
        .arg("%h\n")
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        eprintln!("Coudn't find all cargo.toml");
        exit(1);
    }

    let reader = BufReader::new(&output.stdout[..]);

    for line in reader.lines() {
        match line {
            Ok(line) => {
                if line.eq(".") {
                    continue;
                };

                if line.starts_with("./.devcontainer") {
                    continue;
                }
                packages.push(line)
            }
            Err(err) => println!("Error reading line: {}", err),
        }
    }
    for package in packages {
        let out: String = package.replace("./", ".devcontainer/meta/rs/");

        println!("{out}");

        let dir = fs::create_dir_all(out.clone());
        match dir {
            Ok(_) => {}
            Err(error) => match error.kind() {
                ErrorKind::AlreadyExists => {}
                err => {
                    println!("{err}");
                    panic!("failed to create dir")
                }
            },
        }

        let old = format!("{package}/Cargo.toml");
        let new = format!("{out}/Cargo.toml");

        fs::copy(&old, &new).expect("failed to copy");

        handle_result(fs::create_dir(format!("{}/src", out.clone())));
        handle_result(fs::File::create(format!("{}/src/main.rs", out.clone())));
        handle_result(fs::File::create(format!("{}/src/lib.rs", out.clone())));

        // println!("Copied package.json from {} to {}", old, new);
    }

    copy_file("Cargo.lock");
    copy_file("Cargo.toml");
}

fn handle_result<R>(result: std::io::Result<R>) {
    match result {
        Ok(_) => (),
        Err(ref e) if e.kind() == ErrorKind::AlreadyExists => {
            // println!("Operation resulted in AlreadyExists error");
        }
        Err(e) => panic!("Error: {}", e),
    }
}
