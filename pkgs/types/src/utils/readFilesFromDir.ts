/* eslint-env node */
/// <reference types="node" />
import fs from 'fs'
import path from 'path'

export function FilesFromDir(dir: string): string[] {
  const files = Array<string>()
  const files_or_dirs = fs.readdirSync(dir, {
    withFileTypes: true,
  })

  files_or_dirs.forEach(file_or_dir => {
    if (file_or_dir.isDirectory()) {
      const recursive = FilesFromDir(`${dir}/${file_or_dir.name}`)
      files.push(...recursive)
      return
    }

    files.push(path.join(dir, file_or_dir.name))
  })

  return files
}

export default function readFilesFromDir<T = string>(
  dir: string,
  transform?: (input: { out: string; name: string }) => T,
) {
  const files = FilesFromDir(dir)

  if (transform)
    return files
      .map(f => [f, fs.readFileSync(f, 'utf-8')])
      .map(([name, out]) => transform({ name, out })) as T[]

  return files.map(f => fs.readFileSync(f, 'utf-8')) as T[]
}
