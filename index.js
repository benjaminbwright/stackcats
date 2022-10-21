import { execSync } from "child_process"
import fs from "fs-extra"
import tree from "tree-node-cli"
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const directory = process.argv[2] || "new-project"

export const build = () => console.log("I'm building a stack.");

export const buildTemplate = (template, { isGitRepo }) => {
  const templateDir = path.join(__dirname, `./templates/${template}`);
  console.log(`
Now run:

  cd ${directory}
  `)
  console.log(tree(templateDir, {
    allFiles: true,
  }))
  fs.copySync(templateDir, `./${directory}`)

  if (isGitRepo) {
    execSync(`cd ${directory} && git init && git branch -M main`, { stdio: "inherit"});
  }
}

export const buildViteApp = () => {
  execSync(`npm create vite@latest ${directory}`, { stdio: "inherit"});
  console.log(tree(directory, {
    allFiles: true,
  }))
}

export const buildQwikApp = () => {
  execSync(`npm create qwik@latest ${directory}`, { stdio: "inherit"});
  fs.renameSync("qwik-app", directory);
  console.log(tree(directory, {
    allFiles: true,
  }))
}
