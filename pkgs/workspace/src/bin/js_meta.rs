// look for all package.json file in all workspace and copy them to .devcontainer/meta

use std::fs;
use std::io::ErrorKind;
use std::io::{BufRead, BufReader};
use std::process::{exit, Command};

fn copy_file(file_name: &str) {
    let pwd = std::env::current_dir().expect("Failed to get current directory");
    let pwd = pwd.to_str().expect("Failed to convert to str");

    let source = format!("{}/{}", pwd, file_name);
    let destination = format!("{}/.devcontainer/meta/js/{}", pwd, file_name);

    fs::copy(&source, &destination).unwrap_or_else(|_| panic!("Failed to copy {}", file_name));
}

fn main() {
    let pwd = std::env::current_dir().expect("Failed to get current directory");
    let pwd = pwd.to_str().expect("Failed to convert to str");

    let mut packages: Vec<String> = vec![];

    let output = Command::new("pnpm")
        .arg("-r")
        .arg("exec")
        .arg("pwd")
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        eprintln!("pnpm could find all workspace directories");
        exit(1);
    }

    let reader = BufReader::new(&output.stdout[..]);

    for line in reader.lines() {
        match line {
            Ok(line) => packages.push(line),
            Err(err) => println!("Error reading line: {}", err),
        }
    }
    for package in packages {
        let out = format!("{}/.devcontainer/meta/js", pwd);
        let out = package.replace(pwd, &out);

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

        let old = format!("{package}/package.json");
        let new = format!("{out}/package.json");

        fs::copy(&old, &new).expect("failed to copy");

        println!("Copied package.json from {} to {}", old, new);
    }

    copy_file("package.json");
    copy_file("pnpm-lock.yaml");
    copy_file("pnpm-workspace.yaml");
}
