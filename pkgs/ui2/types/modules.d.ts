// support via `.storybook/main.ts#framework.name`==="@storybook/react-vite"
declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

// support via `.storybook/main.ts#framework.name`==="@storybook/react-vite"
declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}
